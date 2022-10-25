import { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/button';
import { InfoItem } from './components/InfoItem';
import { GridItenType } from './types/GridItenType';
import { itens } from './data/item';
import { Griditem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';


const App = () => {
  const [playing, setPlayng] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItens, setGridItens] = useState<GridItenType[]>([]);

  useEffect(() => resetCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
       if (playing) {setTimeElapsed(timeElapsed + 1);}
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(()=>{
    if(shownCount === 2) {
      let opened = gridItens.filter(item => item.shown === true);
      if(opened.length === 2) {

       
      if(opened[0].item === opened[1].item){
        let tmpGrid = [...gridItens];
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown){
            tmpGrid[i].permanentShown = true;
            tmpGrid[i].shown = false;
            }
          }
          setGridItens(tmpGrid);
          setShownCount(0);
      } else {
       setTimeout(()=>{
        let tmpGrid = [...gridItens];
        for(let i in tmpGrid) {
          tmpGrid[i].shown = false;
        }
         setGridItens(tmpGrid);
        setShownCount(0);
       },1000)
      }
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [shownCount, gridItens]);

  useEffect(()=>{
    if(moveCount > 0 && gridItens.every(item => item.permanentShown === true)) {
      setPlayng(false);
    }
  },[moveCount, gridItens])
  

  const resetCreateGrid = () => {
    //step 1 - reset game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    //step 2 - create grid
    let tmpGrid: GridItenType[] = [];
    for(let i = 0; i < (itens.length * 2); i++) tmpGrid.push({item: null, shown: false, permanentShown: false
      });
    
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < itens.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (itens.length *2));
        }
        tmpGrid[pos].item = i;
      }
    }
    setGridItens(tmpGrid);
    //step 3 - start game
    setPlayng(true);
    
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItens];

      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItens(tmpGrid);
    }
  }

  return (
   <C.Conteiner>
    <C.info>
      <C.LogoLink href=''>
        <img src={logoImage} width="200" alt="" />
      </C.LogoLink>

      <C.infoArea>
        <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}  />
        <InfoItem label='Movimentos' value={moveCount.toString()} />
      </C.infoArea>
      <Button label="Reiniciar" icon={RestartIcon} onClick={resetCreateGrid}/>
    </C.info>
    <C.GridArea>
      <C.Grid>
        {gridItens.map((item, index) => (
          <Griditem 
            key={index}
            item={item}
            onClick={() => handleItemClick(index)}
          />
        ))} 
      </C.Grid>
    </C.GridArea>
   </C.Conteiner>
  )
}

export default App;
