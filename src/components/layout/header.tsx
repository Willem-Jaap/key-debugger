import Link from 'next/link';

import Logo from '~/components/misc/logo';

const Header = () => {
    return (
        <header className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 py-4 pl-8 pr-4">
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <menu className="flex" />
            </nav>
        </header>
    );
};

export default Header;
