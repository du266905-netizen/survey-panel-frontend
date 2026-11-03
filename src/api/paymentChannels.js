import { getPaypalAdvancedConfig } from './paypalAdvanced';

/**
 * 可用通道由服务端决定，前端不硬编码。
 *
 * 服务端在 config 响应里给出 `methods: { card, crypto, bankTransfer }`；
 * 字段缺失时按“卡通道关闭”处理——PayPal 永久停用后，卡通道默认不可用，
 * 新网关上线时由服务端把 card 置为 true。
 *
 * 任何失败（未登录、未配置、网络）都按关闭处理，绝不按可用处理：
 * 展示一个付不通的入口，比不展示更糟。
 */
export const loadPaymentChannels = async () => {
  try {
    const config = await getPaypalAdvancedConfig();
    const methods = config?.methods || {};
    return {
      card: methods.card === true,
      crypto: methods.crypto !== false,
      bankTransfer: methods.bankTransfer !== false,
    };
  } catch {
    return { card: false, crypto: true, bankTransfer: true };
  }
};
