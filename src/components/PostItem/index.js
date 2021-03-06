import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import './index.css'

export default class PostItem extends Component {
  state = {
    likeStatus: false,
    message: '',
  }

  getLikeStatus = async () => {
    const {userPostDetails} = this.props
    const {likeStatus} = this.state
    const {postId} = userPostDetails
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      body: JSON.stringify({like_status: likeStatus}),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    this.setState({message: data.message})
  }

  renderLikesCount = () => {
    const {message} = this.state
    const {userPostDetails} = this.props
    const {likesCount} = userPostDetails
    let count = likesCount + 1
    switch (message) {
      case 'Post has been liked':
        return count
      case 'Post has been disliked':
        count -= 1
        return count
      default:
        return likesCount
    }
  }

  onClickLikeButton = () => {
    this.setState({likeStatus: true}, this.getLikeStatus, this.renderLikesCount)
  }

  onClickUnlikeButton = () => {
    this.setState(
      {likeStatus: false},
      this.getLikeStatus,
      this.renderLikesCount,
    )
  }

  render() {
    const {userPostDetails} = this.props
    const {likeStatus} = this.state
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      createdAt,
      comments,
    } = userPostDetails
    const latestComments = comments.slice(0, 2)
    return (
      <li className="post-item-container" testid="postItem">
        <Link className="post-item-profile-link" to={`/users/${userId}`}>
          <img
            className="post-item-profile-image-el"
            src={profilePic}
            alt="post author profile"
          />
          <h1 className="post-item-heading">{userName}</h1>
        </Link>
        <img
          className="post-item-image-el"
          src={postDetails.imageUrl}
          alt="post"
        />
        <div className="post-item-content-container">
          <div className="post-item-icons-container">
            <button className="post-item-button-el" type="button">
              {likeStatus ? (
                <FcLike
                  testid="unLikeIcon"
                  size="20"
                  color="#F05161"
                  onClick={this.onClickUnlikeButton}
                />
              ) : (
                <BsHeart
                  testid="likeIcon"
                  size="20"
                  onClick={this.onClickLikeButton}
                />
              )}
            </button>
            <button className="post-item-button-el" type="button">
              <FaRegComment size="20" color="#475569" />
            </button>
            <button className="post-item-button-el" type="button">
              <BiShareAlt size="20" color="#475569" />
            </button>
          </div>
          <p className="post-item-highlighted-para">
            {this.renderLikesCount()} likes
          </p>
          <p className="post-item-para">{postDetails.caption}</p>
          <ul className="comments-ul-list">
            {latestComments.map(each => {
              const length = each.userId.length > 14
              const wrap = length ? '...' : ''
              return (
                <li className="comments-list-item" key={each.userId}>
                  <p className="post-item-highlighted-para">
                    {each.userId.slice(0, 14)}
                    {wrap}
                  </p>
                  <p className="post-item-span-el">{each.comment}</p>
                </li>
              )
            })}
          </ul>
          <p className="post-item-created-at-para">{createdAt}</p>
        </div>
      </li>
    )
  }
}
