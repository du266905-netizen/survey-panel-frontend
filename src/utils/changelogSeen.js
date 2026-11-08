import { CHANGELOG } from '../content/changelog';

/* 更新日志读到哪儿了。
 *
 * 只存在这台机器的 localStorage 里：小红点是"这台设备还没看过"，不是账号级已读。
 * 内部工作台够用，也不必为此多开一张表和一个接口。
 */

const KEY = 'guanyi.changelog.seen';

export const latestEntryDate = () => CHANGELOG[0]?.date || '';

export const hasUnseenChangelog = () => {
  try {
    return latestEntryDate() > (window.localStorage.getItem(KEY) || '');
  } catch {
    return false;
  }
};

export const markChangelogSeen = () => {
  try {
    window.localStorage.setItem(KEY, latestEntryDate());
  } catch {
    /* 隐私模式：这一轮不记，也不影响看 */
  }
};
