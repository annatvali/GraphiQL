import { useTranslations } from 'next-intl';

export default function Main() {
  const t = useTranslations('MAIN');

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto">
      <h1 className="color-white text-[45px] font-medium">{t('title')}</h1>
      <p>{t('descr')}</p>
    </div>
  );
}
