import React, { Component } from 'React'

class Post extends Component {
  render() {
    <div>
      <div>
        <div class="title and user poster info here"></div>
        <div class="comment section here">
          {/* sample comment below */}
          <div>
            <p>{/* comment here */}</p>
            <span>{/* comment on comment button here */}</span>
            <div>
              <p>{/* comment on comment here */}</p>
              <span>{/* comment on comment button here */}</span>
            </div>
          </div>
          <div>
            <p>{/* another comment */}</p>
              <span>{/* comment on comment button here */}</span>
          </div>
          <div>
            {/* comment here */}
            <form>
              <textarea></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Post
