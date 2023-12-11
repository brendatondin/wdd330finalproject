import {InputBase, styled} from "@mui/material";
import variables from './variables.module.scss';
export const InputDefault = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(2),
    },
    '& .MuiInputBase-input': {
        borderRadius: variables.smallBorderRadius,
        position: 'relative',
        backgroundColor: variables.baseColor,
        border: '1px solid',
        borderColor: variables.strokeColor,
        fontSize: 14,
        width: '100%',
        padding: '10px 14px',
    },
    '& .MuiInputAdornment-root': {
        position: 'absolute',
        right: '16px'
    }
}));

// eslint-disable-next-line react-refresh/only-export-components
export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    width:'100%',
    maxWidth:'60vw',
    maxHeight: '85vh',
    overflow: 'hidden',
    p: 4,
    background: variables.offBaseBg,
    borderRadius: variables.defaultBorderRadius
};
