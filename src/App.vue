<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #272b30;
}

.list {
  margin: 0;
  padding: 0;
  border-top: 1px solid #e9e9e9;
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;

  &-item {
    list-style: none;
    padding: .5rem;
    border-bottom: 1px solid #e9e9e9;
    cursor: pointer;

    &:hover {
      background: #f3f3f3;
      border-bottom: 1px solid #e7e7e7;
    }
    &:active {
      background: #eaf8ff;
      border: 1px solid #b6daeb;
    }
  }
}

</style>
