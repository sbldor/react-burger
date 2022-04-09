
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { deleteIngredientFromConstructor, dragIngredients } from '../../services/slices/ingredients-slice';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import style from '../ingredient-constructor/ingredient-constructor.module.css';
import PropTypes from 'prop-types'

const IngredientConstructor = ({ item, index }) => {

   const dispatch = useDispatch()
   const ref = useRef(null)

   const [{ isDragging }, drag] = useDrag({
      type: 'cartIngredient',
      item: () => ({ item, index }),
      collect: (monitor) => ({ isDragging: monitor.isDragging() })
   })
   // @ts-ignore
   const [{ handlerId }, drop] = useDrop({
      accept: 'cartIngredient',
      drop: item => {
         // @ts-ignore
         const dragIndex = item.index;
         const hoverIndex = index;
         if(dragIndex== hoverIndex) return;
         dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }))
      },
      hover: (item, monitor) => {
         if (!ref.current) return
         // @ts-ignore
         const dragIndex = item.index
         const hoverIndex = index

         if (dragIndex === hoverIndex) return

         const hoverBoundingRect = ref.current?.getBoundingClientRect()
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset = monitor.getClientOffset()
         const hoverClientY = clientOffset.y - hoverBoundingRect.top
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

         dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }))
         // @ts-ignore
         item.index = hoverIndex
      }
   })

   const opacity = { opacity: isDragging ? 0 : 1 }
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

IngredientConstructor.propTypes = {
   index: PropTypes.number,
   item: PropTypes.object
}


export default IngredientConstructor