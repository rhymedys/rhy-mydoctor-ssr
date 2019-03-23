/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = app => {
  const exports = {};
  exports.logger = {
    consoleLevel: 'ERROR',
    dir: path.join(app.baseDir, 'logs')
  };
  return exports;
};
