<template lang="pug">
  div.mt-2
    h1 Our Timeline
    p The following is a selection of tweets showing the evolution of the project since it's inception!
    p
      button.btn.btn-primary(@click='reverseOrder') Reverse Order
    br
    .timeline
      .timeline-item(v-for='(item, index) in milestones' :key='item.date')
        .timeline-left
          a.timeline-icon.tooltip(:href='"#milestone-" + item.date' :data-tooltip='item.date' :class='{"icon-lg": index !== milestones.length - 1}')
            i.icon.icon-check(v-if='index !== milestones.length - 1')
        .timeline-content
          .tile
            .tile-content
              .tile-subtitle(v-html='getMilestoneTitle(item)')
          iframe(:src='getLink(item)')

    br
</template>

<script>
import lockr from 'lockr'

export default {
  data () {
    const isReversed = !lockr.get('view-history-isReversed')
    let milestones = [
      {
        date: '2018-04-17',
        title: 'Z-Depth',
        tweet: 'https://twitter.com/LabOfOz/status/986393530414153728'
      },
      {
        date: '2018-04-13',
        title: 'Asking for Help',
        tweet: 'https://twitter.com/LabOfOz/status/985043020608290816'
      },
      {
        date: '2018-04-04',
        title: 'Google Visit',
        tweet: 'https://twitter.com/LabOfOz/status/981593804313538560'
      },
      {
        date: '2018-03-27',
        title: 'Clicking',
        tweet: 'https://twitter.com/LabOfOz/status/978776989090787328'
      },
      {
        date: '2018-03-25',
        title: 'Eye Tracking',
        tweet: 'https://twitter.com/LabOfOz/status/978098438989475841'
      },
      {
        date: '2018-03-20',
        title: 'Commitment',
        tweet: 'https://twitter.com/LabOfOz/status/976287674016325632'
      },
      {
        date: '2018-03-16',
        title: 'Tutorial Site',
        tweet: 'https://twitter.com/LabOfOz/status/974824189235421186'
      },
      {
        date: '2018-03-15',
        title: '1st Experiment',
        tweet: 'https://twitter.com/LabOfOz/status/973089354598965248'
      },
      {
        date: '2018-03-04--2',
        title: '1st Prototype',
        tweet: 'https://twitter.com/LabOfOz/status/970556829125165056'
      },
      {
        date: '2018-03-04--1',
        title: 'Ideation',
        tweet: 'https://twitter.com/LabOfOz/status/970409069717569536'
      }
    ]

    isReversed && milestones.reverse()

    return {
      milestones,
      isReversed
    }
  },

  methods: {
    /**
     * Gets a formatted title from a date string and title
     * @param  {OBJ} milestone The milestone object
     * @return {STR}           The formatted title
     */
    getMilestoneTitle (milestone) {
      let date = new Date(milestone.date)

      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }) + ` - <b>${milestone.title}</b>`
    },

    /**
     * Gets the link for the tweet
     * @param  {OBJ} milestone The milestone object
     * @return {STR}           The formatted link
     */
    getLink (milestone) { return `//twitframe.com/show?url=${milestone.tweet}` },

    /**
     * Reverses the order of tweets
     */
    reverseOrder () {
      this.milestones.reverse()
      this.isReversed = !this.isReversed
      lockr.set('view-history-isReversed', this.isReversed)
    }
  }
}
</script>

<style scoped lang='stylus'>
  iframe
    min-height: 760px
    margin-top: 20px
</style>
