export type SubMenu = { title: string; emoji: string; link: string };
export type Menu = { title: string; emoji: string; children: SubMenu[] };

export const sidebarConfig: Menu[] = [
  {
    title: '프로필 정보',
    emoji: '👨🏻‍💻',
    children: [
      { emoji: '📸', title: '아바타 변경', link: '/profile/avatar' },
      { emoji: '🆕', title: '닉네임 변경', link: '/profile/nickname' },
      { emoji: '🔐', title: '비밀번호 재설정', link: '/profile/password' },
      { emoji: '📧', title: '웹메일 인증', link: '/profile/mail' },
      { emoji: '🖥️', title: '포털 계정 연동', link: '/profile/portal' },
    ],
  },
  {
    title: '통합계정 이용내역',
    emoji: '🔗',
    children: [
      { emoji: '📱', title: '로그인한 기기', link: '/devices' },
      { emoji: '📃', title: '연동 중인 서비스', link: '/services' },
      { emoji: '🤯', title: '서비스 이용제한 내역', link: '/block-logs' },
    ],
  },
  {
    title: '개발자 센터',
    emoji: '‍🔨',
    children: [
      { emoji: '⭐️', title: '내 서비스 관리', link: '/developer/services' },
    ],
  },
  {
    title: '고객지원 센터',
    emoji: '☎️',
    children: [
      { emoji: '💬', title: '채팅으로 상담하기', link: '#' },
      {
        emoji: '🔐',
        title: '개인정보처리방침',
        link: 'https://www.uoslife.team/docs/privacy',
      },
      {
        emoji: '🔏️',
        title: '이용약관',
        link: 'https://www.uoslife.team/docs/tos',
      },
    ],
  },
];
