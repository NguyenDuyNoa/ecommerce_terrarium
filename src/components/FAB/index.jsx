import { Link } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import MessageIcon from '@mui/icons-material/Message';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from 'react';

let FAB = () => {
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowArrow(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-center">
            {showArrow && (
                <div className='mb-2 cursor-pointer'>
                    <ArrowUpwardIcon
                        fontSize='large'
                        sx={{ color: 'white', padding: '6px', fontSize: '40px', background: '#7DC9AF', borderRadius: '100px' }}
                        onClick={handleScrollToTop}
                    />
                </div>
            )}
            <div className='mb-2'>
                <Link to='tel:0336878073' target="_blank">
                    <CallIcon fontSize='large' sx={{ color: 'white', padding: '6px', fontSize: '40px', background: '#7DC9AF', borderRadius: '100px' }} />
                </Link>
            </div>
            <div className='mb-2'>
                <Link to='https://www.facebook.com/wlejardin.terrarium/' target="_blank">
                    <FacebookOutlinedIcon fontSize='large' sx={{ color: '#7DC9AF', fontSize: '48px' }} />
                </Link>
            </div>
            <div className=''>
                <Link to='https://m.me/lejardin.terrarium' target="_blank">
                    <MessageIcon fontSize='large' sx={{ color: 'white', padding: '6px', fontSize: '40px', background: '#7DC9AF', borderRadius: '100px' }} />
                </Link>
            </div>
        </div>
    );
};

export default FAB;
