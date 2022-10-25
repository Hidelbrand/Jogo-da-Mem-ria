import { GridItenType } from '../../types/GridItenType';
import * as C from './styles'
import b7Svg from '../../svgs/b7.svg'
import { itens } from '../../data/item'


type Props = {
    item: GridItenType;
    onClick: () => void
}

export const Griditem = ({item, onClick}: Props) => {
    return (
        <C.Conteiner 
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}>
           {item.permanentShown === false && item.shown === false &&
                <C.Icon src={b7Svg} alt="" opacity={.1} />
           }
           {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={itens[item.item].icon} alt="" />
           }
        </C.Conteiner>
    );
}