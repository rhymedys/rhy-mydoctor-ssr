<template>
  <login-layout title="Rhymedys's Home" mobile="true">
    <div class="login-wrapper">
      <div class="login-wrapper__header">
        <div>欢迎使用</div>
      </div>
      <div class="login-wrapper__form">
        <el-input 
          v-model="id" 
          placeholder="请输入账号"
          clearable
        />
        <el-input 
          v-model="password" 
          placeholder="请输入密码"
          type="password"
          clearable
        />

        <el-button 
          class="login-wrapper__form_confrim-btn" 
          type="primary" 
          :disabled="computeBtnDisabled"
          @click.native="onLoginClick"
          round
        >
          登录
        </el-button>
        <el-button 
          class="login-wrapper__form_confrim-btn" 
          type="primary" 
          @click.native="onTestLoginClick"
          round
        >
          登录测试账号
        </el-button>
      </div>
    </div>
  </login-layout>
</template>


<script src="./login.js" type="babel"></script>


