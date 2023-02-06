import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import allWebtoonData from '../data'
import './Table.css'
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg'
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'

function Home() {
  const [sortBy, setSortBy] = useState('rating')
  const [filterBy, setFilterBy] = useState('all')
  const [sortedWebtoonData, setSortedWebtoonData] = useState(
    allWebtoonData.sort(sortByField)
  )

  // function for sorting by selected fields
  function sortByField(webtoon1, webtoon2) {
    if (parseFloat(webtoon2[sortBy]) > parseFloat(webtoon1[sortBy])) {
      return 1
    }
    if (parseFloat(webtoon2[sortBy]) < parseFloat(webtoon1[sortBy])) {
      return -1
    }
    return 0
  }

  useEffect(() => {
    let filteredWebtoons = allWebtoonData.sort(sortByField)
    if (filterBy !== 'all') {
      filteredWebtoons = filteredWebtoons.filter(
        (webtoon) => webtoon.genre === filterBy
      )
    }
    setSortedWebtoonData(filteredWebtoons.sort(sortByField))
  }, [sortBy, filterBy])

  return (
    <>
      <Navbar>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu
            sortBy={sortBy}
            setSortBy={setSortBy}
            setFilterBy={setFilterBy}
          ></DropdownMenu>
        </NavItem>
      </Navbar>
      <div className='photo-grid'>
        {sortedWebtoonData.map((webtoon) => {
          return (
            <a
              href={webtoon.url}
              key={webtoon.title}
              target='_blank'
              rel='noreferrer noopener'
            >
              <div
                className='card'
                style={{ backgroundImage: `url(${webtoon.img_url})` }}
              >
                {webtoon.rating}
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu({ sortBy, setSortBy, setFilterBy }) {
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

export default Home
