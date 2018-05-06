import React from 'react';

export default class IdeaPost extends React.Component {
  constructor(props) {
    super(props);
    let ideaDesc = props.ideaDesc;
    let committee = ideaDesc.substring(ideaDesc.indexOf("Committee:")+("Committee").length+2, ideaDesc.indexOf("Submitted"));
    let author = ideaDesc.substring(ideaDesc.indexOf("Submitted by:")+("Submitted by:").length+2, ideaDesc.indexOf("Slack ID"));
    let upvotes = 0;
    console.log("Upvotes: "+ ideaDesc.indexOf("Upvotes: ")+("Upvotes: ").length, ideaDesc.indexOf(" ",ideaDesc.indexOf("Upvotes: ")+("Upvotes: ").length));
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
        <div className = "committee">{this.state.committee}</div><h2 className = "name">{this.state.name}</h2>
        <p className = "upvotes">{this.state.upvotes}</p>
        <p className = "author">{this.state.author}</p>
      </div>
      <style jsx>{`
        .idea {
          background-color: #F4CDA5;
          padding: 20px;
          border-radius: 8px;
        }
        .committee {
          font-weight: bold;
        }
        .name {
          font-weight: bold;
        }
        .author {
          font-size: .8em;
        }
        .upvotes {
          font-weight: bold;
          font-size: .8em;
        }
        `}</style>
        </div>
    );
  }
}
