import Sequelize from 'sequelize';
import config from '../../config/config.json';

export default new Sequelize(config.development.database, config.development.username, config.development.password, config.development);
