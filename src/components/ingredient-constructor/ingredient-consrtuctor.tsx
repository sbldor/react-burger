import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../services';
import { deleteIngredientFromConstructor, dragIngredients } from '../../services/slices/ingredients-slice';
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor, XYCoord } from 'react-dnd';
import { useRef } from 'react';
import style from '../ingredient-constructor/ingredient-constructor.module.css';
import { TIngredient } from '../../utils/types'
import { FC } from 'react'


interface IIngredientConstructor  {
   readonly item: TIngredient,
   readonly index: number,
};

const IngredientConstructor: FC<IIngredientConstructor> = ({ item, index }) => {

   const dispatch = useAppDispatch()
   const ref = useRef<HTMLLIElement>(null)

   const [{ isDragging }, drag] = useDrag({
      type: 'cartIngredient',
      item: () => ({ item, index }),
      collect: (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() })
   })

   const [{ handlerId }, drop] = useDrop({
      accept: 'cartIngredient',
      collect: (monitor: DropTargetMonitor) => ({ handlerId: monitor.getHandlerId() }),
      drop: (item: TIngredient ) => {
         const dragIndex: number = item.index;
         const hoverIndex: number = index;
         if(dragIndex === hoverIndex) return;
         dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }))
      },
      hover: (item: TIngredient, monitor: DropTargetMonitor) => {
         if (!ref.current) return

         const dragIndex: number = item.index
         const hoverIndex: number = index

         if (dragIndex === hoverIndex) return

         const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
         const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset: XYCoord = monitor.getClientOffset()
         const hoverClientY: number = clientOffset.y - hoverBoundingRect.top
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

         dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }))

         item.index = hoverIndex
      }
   })

   const opacity: { opacity: number} = { opacity: isDragging ? 0.2 : 1 }

   drag(drop(ref))

   return (
      <li style={opacity}
         data-handler-id={handlerId}
         ref={ref}
         draggable
         className={`${style.ingredients} ml-2`} >
         <DragIcon type="primary" />
         <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => dispatch(deleteIngredientFromConstructor(item))} />
      </li>
   )
}

export default IngredientConstructor