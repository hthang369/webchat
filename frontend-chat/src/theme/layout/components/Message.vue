<template>
  <li class="message-preview">
    <a href="#">
      <div class="media">
        <span class="pull-left">
          <img
            :src="image"
            class="media-object img-circle"
            width="50px"
            height="50px"
            alt="">
        </span>
        <div class="media-body">
          <div class="col-md-9 col-sm-9 col-xs-9">
            <h5 class="media-heading"><strong v-text="name"/>
            </h5>
            <p
              class="small text-muted"
              v-text="time"/>
            <p v-text="body"/>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-3 icons">

            <i
              class="fa fa-check"
              aria-hidden="true"/>
            <i
              class="fa fa-times-circle-o"
              aria-hidden="true"/>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
