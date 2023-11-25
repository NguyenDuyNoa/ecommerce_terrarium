import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomizedButtons = styled(Button)({
    boxShadow: 'none',
    height: '40px',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#3d9e7b',
    color: 'white',
    fontFamily: [
        'Lexend', 
        'sans-serif'
    ].join(','),
    '&:hover': {
        backgroundColor: '#7DC9AF',
        boxShadow: 'none'
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#000'
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(125, 201, 174,.5)',
    },
});

export default CustomizedButtons;