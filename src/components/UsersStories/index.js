import Slider from 'react-slick'

import './index.css'

const UsersStories = props => {
  const {usersStoriesDetails} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 658,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <ul className="home-users-story-container">
      <Slider className="home-stories-slider-container" {...settings}>
        {usersStoriesDetails.map(each => {
          const length = each.userId.length > 11
          const wrap = length ? '...' : ''
          return (
            <li key={each.userId} className="insta-story-item">
              <div className="story-box">
                <img
                  className="insta-story-image"
                  src={each.storyUrl}
                  alt="user story"
                />
              </div>
              <p className="insta-story-para">
                {each.userId.slice(0, 11)}
                {wrap}
              </p>
            </li>
          )
        })}
      </Slider>
    </ul>
  )
}

export default UsersStories
