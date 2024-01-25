import Link from 'next/link';
import type { UrlObject } from 'url';

interface INavButtonProps {
  onClick: string | UrlObject;
  text: string;
  style: 'primary' | 'secondary';
}

const NavButton:INavButtonProps  = ({ onClick, text, style }) => {
  const styleButton =
    style === 'primary'
      ? 'bg-pink text-white'
      : 'border border-pink text-pink hover:bg-pink hover:text-white';

  return (
    <Link href={onClick} className={`px-4 py-2 rounded ${styleButton}`}>
        {text}
    </Link>
  );
};

export default NavButton;
