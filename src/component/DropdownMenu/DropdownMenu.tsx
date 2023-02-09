import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg'
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg'
import './DropdownMenu.css'

function DropdownMenu({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  displayMetrics,
  setDisplayMetrics,
}) {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        href='#'
        className='menu-item'
        style={{
          ...((props.sort === sortBy || props.filter === filterBy) && {
            color: 'red',
          }),
        }}
        onClick={() => {
          if (props.goToMenu) {
            setActiveMenu(props.goToMenu)
          }
          if (props.sort) {
            setSortBy(props.sort)
          }
          if (props.filter) {
            setFilterBy(props.filter)
          }
          if (props.displayMetrics) {
            setDisplayMetrics(!displayMetrics)
          }
        }}
      >
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames='menu-primary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem
            leftIcon={<ChevronIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu='Sort'
          >
            Sort
          </DropdownItem>
          <DropdownItem
            leftIcon={<ChevronIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu='Filter'
          >
            Filter
          </DropdownItem>
          <DropdownItem leftIcon='👀' displayMetrics='true'>
            Toggle Metrics
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Sort'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
            <h2>Metrics</h2>
          </DropdownItem>
          <DropdownItem sort='rating' leftIcon='⭐'>
            Ratings
          </DropdownItem>
          <DropdownItem sort='views_count' leftIcon='👀'>
            Views
          </DropdownItem>
          <DropdownItem sort='subscribed_count' leftIcon='✅'>
            Subscribed
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Filter'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
            <h2>Genres</h2>
          </DropdownItem>
          <DropdownItem filter='all' leftIcon='❤️'>
            All
          </DropdownItem>
          <DropdownItem filter='Drama' leftIcon='🎭'>
            Drama
          </DropdownItem>
          <DropdownItem filter='Action' leftIcon='🎬'>
            Action
          </DropdownItem>
          <DropdownItem filter='Sports' leftIcon='🏆'>
            Sports
          </DropdownItem>
          <DropdownItem filter='Fantasy' leftIcon='🐲'>
            Fantasy
          </DropdownItem>
          <DropdownItem filter='Romance' leftIcon='💌'>
            Romance
          </DropdownItem>
          <DropdownItem filter='Thriller' leftIcon='🔥'>
            Thriller
          </DropdownItem>
          <DropdownItem filter='Horror' leftIcon='😱'>
            Horror
          </DropdownItem>
          <DropdownItem filter='Supernatural' leftIcon='🛸'>
            Supernatural
          </DropdownItem>
          <DropdownItem filter='Sci-fi' leftIcon='🛸'>
            Sci-fi
          </DropdownItem>
          <DropdownItem filter='Comedy' leftIcon='😂'>
            Comedy
          </DropdownItem>
          <DropdownItem filter='Slice of life' leftIcon='🍰'>
            Slice of life
          </DropdownItem>
          <DropdownItem filter='Historical' leftIcon='📜'>
            Historical
          </DropdownItem>
          <DropdownItem filter='Superhero' leftIcon='🦸'>
            Superhero
          </DropdownItem>
          <DropdownItem filter='Informative' leftIcon='📚'>
            Informative
          </DropdownItem>
          <DropdownItem filter='Heartwarming' leftIcon='☀️'>
            Heartwarming
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropdownMenu
