<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <el-button
            class="button"
            text
          >
            Operation button
          </el-button>
        </div>
      </template>
      <div
        v-for="o in 4"
        :key="o"
        class="text item"
      >
        {{ 'List item ' + o }}
      </div>
    </el-card>
    <div />
  </div>
</template>
