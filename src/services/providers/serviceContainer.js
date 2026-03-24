import { createServices } from './createServices';

/**
 * Лёгкий сервис-контейнер.
 * Следующий шаг после gateways — полноценные Demo/Firebase provider-реализации,
 * переключаемые фабрикой.
 */
export const services = createServices();
