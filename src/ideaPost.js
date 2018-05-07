import React from 'react';

export default class IdeaPost extends React.Component {
  constructor(props) {
    super(props);
    let ideaDesc = props.ideaDesc;
    let committee = ideaDesc.substring(ideaDesc.indexOf("Committee:")+("Committee").length+2, ideaDesc.indexOf("Submitted"));
    let author = ideaDesc.substring(ideaDesc.indexOf("Submitted by:")+("Submitted by:").length+2, ideaDesc.indexOf("Slack ID"));
    let upvotes = 0;
    if(ideaDesc.indexOf("Upvotes: ")!=-1) {
      if(ideaDesc.indexOf("Edited")==-1) {
        upvotes = ideaDesc.substring(ideaDesc.indexOf("Upvotes: ")+("Upvotes: ").length, ideaDesc.length);
      } else {
        upvotes = ideaDesc.substring(ideaDesc.indexOf("Upvotes: ")+("Upvotes: ").length, ideaDesc.indexOf("Edited"));
      }
    }
    this.state = {
      name: props.ideaName,
      committee: committee,
      author: author,
      upvotes: upvotes
    }
  }
  render() {
    return (
      <div>
        <div className="idea">
          <div className = "title">
          <div className = "committee">{this.state.committee}</div><p className = "name">{this.state.name}</p>
          <p className = "author">{this.state.author}</p>
        </div>
          <p className = "upvotes">{this.state.upvotes} Upvotes</p>
        </div>
      <style jsx>{`
        .idea {
          background-color: #F4CDA5;
          padding: 12px;
          margin: 10px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
        }
        .committee {
          font-weight: bold;
          display: inline-block;
          padding: 10px;
          margin: 5px;
          background-color: green;
          border-radius: 5px;
        }
        .name {
          font-weight: bold;
          display: inline-block;
        }
        .author {
          font-size: .8em;
          margin: 10px 0px 0 10px;
          font-style: italic;
        }
        .upvotes {
          font-weight: bold;
          font-size: 1em;
        }
        `}</style>
        </div>
    );
  }
}
