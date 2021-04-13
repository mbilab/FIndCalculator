<template lang="pug">
.ui.container.segment

  #tsps.ui.divided.unstackable.items
    .item
      .image: img(src='https://play-lh.googleusercontent.com/c9Ef8mWL1hblktrRAil1FaDVEPywqdetidikjj0MvCoeogAiakPxJTICNQuZksDYCA=s360-rw')
      .content
        .header 麻布記帳 Moneybook
        .description 最創新的記帳服務
        .extra
          span.-spending 本月支出：3231
    .item
      .image: img(src='https://play-lh.googleusercontent.com/_vefWfZPhj-_p0oYf5rDdQYGhea2tBmfQ_dxSgagyj7QD-py1BHhxqyxu89hnuN-pY8=s360-rw')
      .content
        .header 發票怪獸
        .description 每次對獎，都有驚喜
        .extra
          span.-spending 本月支出：1250
    .item
      .image: img(src='https://play-lh.googleusercontent.com/ddz2VOlB1TIVJKsXOAV8s-_K4kTjur3oWOS8vPQ9RfPBFwW9BWBDQPofdfoXUWoVDo4=s360-rw')
      .content
        .header 保險小存摺
        .description 佛心來的保險APP
        .extra
          .ui.basic.mini.button #[i.linkify.icon]綁定
  button.ui.fluid.primary.button(@click='setPage("FIndCalculator")') OK
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'FIndSpending',
  methods: {
    ...mapMutations(['setPage'])
  }
}
</script>

<style scoped lang="sass">
#tsps .image, #tsps img
  width: 72px !important
</style>
