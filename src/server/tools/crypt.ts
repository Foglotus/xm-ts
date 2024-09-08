// 导入 crypto 模块
import crypto from 'crypto';

export function md5(data: string) {
    // 定义要加密的字符串
    // 创建一个哈希实例
    const hash = crypto.createHash('md5');

    // 向哈希实例中写入数据
    hash.update(data);

    // 计算得到的 md5 哈希值
    return hash.digest('hex');
}