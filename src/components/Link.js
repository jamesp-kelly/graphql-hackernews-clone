import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { timeDifferenceForDate } from '../utils';
import { GC_USER_ID, LINKS_PER_PAGE } from '../constants';

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class Link extends Component {
  
  _voteForLink = async () => {
    const userId = localStorage.getItem(GC_USER_ID);
    const voterIds = this.props.link.votes.map(vote => vote.user.id);
    if (voterIds.includes(userId)) {
      console.log(`User (${userId}) already voted for this link.`);
      return;
    }
    const linkId = this.props.link.id;
    await this.props.link.id;
    await this.props.createVoteMutation({
      variables: {
        userId,
        linkId
      },
      update: (store, { data: { createVote} }) => {
        this.props.updateStoreAfterVote(store, createVote, linkId);
      }
    });
  }

  

  render() {
    const userId = localStorage.getItem(GC_USER_ID);
    const linkIndex = ((this.props.page - 1) * LINKS_PER_PAGE) + this.props.index + 1;
    
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{linkIndex}.</span>
          {userId && <div className="mil gray f11" onClick={() => this._voteForLink()}>▲</div>}
        </div>
        <div className="ml1">
          <div>{this.props.link.description} ({this.props.link.url})</div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'}
            {' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(CREATE_VOTE_MUTATION, {
  name: 'createVoteMutation'
})(Link);