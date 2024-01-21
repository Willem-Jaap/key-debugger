import Image from 'next/image';

const Logo = () => {
    return (
        <div className="flex items-center gap-4 font-mono">
            <Image src="/assets/images/logo.png" alt="Key Debugger Logo" width={40} height={40} />
            <span>Key Debugger</span>
        </div>
    );
};

export default Logo;
