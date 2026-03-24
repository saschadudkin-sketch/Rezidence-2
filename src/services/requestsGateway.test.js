jest.mock('../config/runtimeMode', () => ({
  isLiveMode: jest.fn(),
}));

jest.mock('./firebaseService', () => ({
  createRequest: jest.fn(),
  uploadRequestPhoto: jest.fn(),
  updateRequest: jest.fn(),
  deleteRequest: jest.fn(),
}));

import { isLiveMode } from '../config/runtimeMode';
import { createRequest, uploadRequestPhoto, updateRequest, deleteRequest } from './firebaseService';
import { resolveRequestPhotos, submitRequest, updateRequestEverywhere, deleteRequestEverywhere } from './requestsGateway';

describe('requestsGateway', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createRequest.mockResolvedValue(undefined);
  });

  test('resolveRequestPhotos returns local photos in demo mode', async () => {
    isLiveMode.mockReturnValue(false);
    const photos = ['a', 'b'];
    const result = await resolveRequestPhotos('r1', photos);
    expect(result).toEqual(['a', 'b']);
    expect(uploadRequestPhoto).not.toHaveBeenCalled();
  });

  test('resolveRequestPhotos uploads photos in live mode', async () => {
    isLiveMode.mockReturnValue(true);
    uploadRequestPhoto
      .mockResolvedValueOnce('u1')
      .mockResolvedValueOnce('u2');

    const result = await resolveRequestPhotos('r2', ['a', 'b']);
    expect(result).toEqual(['u1', 'u2']);
    expect(uploadRequestPhoto).toHaveBeenCalledTimes(2);
  });

  test('submitRequest sends remote in live mode', () => {
    isLiveMode.mockReturnValue(true);
    const addLocal = jest.fn();

    const mode = submitRequest({ request: { id: 'r3' }, addLocal });

    expect(mode).toBe('remote');
    expect(createRequest).toHaveBeenCalledTimes(1);
    expect(addLocal).not.toHaveBeenCalled();
  });

  test('submitRequest sends local in demo mode', () => {
    isLiveMode.mockReturnValue(false);
    const addLocal = jest.fn();

    const mode = submitRequest({ request: { id: 'r4' }, addLocal });

    expect(mode).toBe('local');
    expect(addLocal).toHaveBeenCalledTimes(1);
  });

  test('updateRequestEverywhere updates local only in demo mode', () => {
    isLiveMode.mockReturnValue(false);
    const updateLocal = jest.fn();

    updateRequestEverywhere({ requestId: 'r5', patch: { comment: 'x' }, updateLocal });

    expect(updateLocal).toHaveBeenCalledWith('r5', { comment: 'x' });
    expect(updateRequest).not.toHaveBeenCalled();
  });

  test('updateRequestEverywhere updates local + remote in live mode', () => {
    isLiveMode.mockReturnValue(true);
    const updateLocal = jest.fn();
    updateRequest.mockResolvedValue(undefined);

    updateRequestEverywhere({ requestId: 'r6', patch: { comment: 'y' }, updateLocal });

    expect(updateLocal).toHaveBeenCalledWith('r6', { comment: 'y' });
    expect(updateRequest).toHaveBeenCalledWith('r6', { comment: 'y' });
  });

  test('deleteRequestEverywhere removes local only in demo mode', () => {
    isLiveMode.mockReturnValue(false);
    const deleteLocal = jest.fn();

    deleteRequestEverywhere({ requestId: 'r7', deleteLocal });

    expect(deleteLocal).toHaveBeenCalledWith('r7');
    expect(deleteRequest).not.toHaveBeenCalled();
  });

  test('deleteRequestEverywhere removes local + remote in live mode', () => {
    isLiveMode.mockReturnValue(true);
    const deleteLocal = jest.fn();
    deleteRequest.mockResolvedValue(undefined);

    deleteRequestEverywhere({ requestId: 'r8', deleteLocal });

    expect(deleteLocal).toHaveBeenCalledWith('r8');
    expect(deleteRequest).toHaveBeenCalledWith('r8');
  });
});
