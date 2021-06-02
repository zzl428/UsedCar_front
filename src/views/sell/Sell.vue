<template>
  <div class="sell">
    <navbar title='快速买车'></navbar>
    
      <van-form ref="addform">
        <span>基本信息</span>
        <van-field v-model="selectedKeys" label="品牌车系" placeholder="请选择爱车品牌车系"
          @click="show = true" :rules="[{ required: true, message: '请选择爱车品牌车系' }]"/>
        <van-field v-model="addForm.title" name="商品名称" label="标题" placeholder="请输入商品名称"
          :rules="[{ required: true, message: '请填写商品名称' }]"/>
        <van-field v-model="addForm.price" name="价格" label="价格" placeholder="价格"
          :rules="[{ required: true, message: '请填写价格' }]"/>
        <van-field v-model="addForm.old_price" name="原价" label="原价" placeholder="原价"
          :rules="[{ required: true, message: '请填写商品原价' }]"/>
        <van-field v-model="addForm.odograph" name="表显里程" label="表显里程" placeholder="表显里程"
          :rules="[{ required: true, message: '请填写表显里程' }]"/>
        <van-field v-model="addForm.tranfer" name="转让次数" label="转让次数" placeholder="转让次数"
          :rules="[{ required: true, message: '请填写转让次数' }]"/>
        <van-field v-model="addForm.card_time" name="上牌时间" label="上牌时间" placeholder="上牌时间"
          @click="showCardTime = true" :rules="[{ required: true, message: '请填写上牌时间' }]"/>

        <span>汽车参数</span>
        <van-field v-model="attrsForm.firm" name="厂商" label="厂商" placeholder="厂商"/>
        <van-field v-model="paramsForm.engine_power" name="发动机功率" label="发动机功率" placeholder="发动机功率"/>
        <van-field v-model="paramsForm.displacement" name="排量" label="排量" placeholder="排量"/>
        <van-field name="车座数量" label="车座数量">
          <template #input>
            <van-stepper v-model="paramsForm.seats" />
          </template>
        </van-field>
        <van-field clickable name="燃料类型" :value="paramsForm.fuel_type" label="燃料类型" placeholder="燃料类型"
          @click="showPicker = true"/>
        <van-field name="radio" label="汽油标号">
          <template #input>
            <van-radio-group v-model="attrsForm.fuel_num" direction="horizontal">
              <van-radio name="92">92 号</van-radio>
              <van-radio name="95">95 号</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="长" label="长">
          <template #input>
            <van-stepper v-model="attrsForm.length" />
          </template>
        </van-field>
        <van-field name="宽" label="宽">
          <template #input>
            <van-stepper v-model="attrsForm.width" />
          </template>
        </van-field>
        <van-field name="高" label="高">
          <template #input>
            <van-stepper v-model="attrsForm.height" />
          </template>
        </van-field>
        <van-field name="气缸数" label="气缸数">
          <template #input>
            <van-stepper v-model="attrsForm.cylinder" />
          </template>
        </van-field>
        <van-field name="轴距" label="轴距">
          <template #input>
            <van-stepper v-model="attrsForm.wheelbase" />
          </template>
        </van-field>

        <span>汽车属性</span>
        <van-field name="radio" label="使用性质">
          <template #input>
            <van-radio-group v-model="paramsForm.is_business" direction="horizontal">
              <van-radio name="运营">运营</van-radio>
              <van-radio name="非运营">非运营</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="产权性质">
          <template #input>
            <van-radio-group v-model="paramsForm.is_private" direction="horizontal">
              <van-radio name="私用">私用</van-radio>
              <van-radio name="公用">公用</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="变速箱">
          <template #input>
            <van-radio-group v-model="paramsForm.is_auto" direction="horizontal">
              <van-radio name="自动">自动</van-radio>
              <van-radio name="手动">手动</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field clickable name="车型" :value="paramsForm.car_type" label="车型" placeholder="车型"
          @click="showCarType = true"/>
        <van-field name="radio" label="排放标准">
          <template #input>
            <van-radio-group v-model="paramsForm.displace_reg" direction="horizontal">
              <van-radio name="国三">国三</van-radio>
              <van-radio name="国四">国四</van-radio>
              <van-radio name="国五">国五</van-radio>
              <van-radio name="国六">国六</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="驱车制动类型">
          <template #input>
            <van-radio-group v-model="paramsForm.break" direction="horizontal">
              <van-radio name="0">手刹</van-radio>
              <van-radio name="1">脚刹</van-radio>
              <van-radio name="2">电子驻车</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <span>汽车图片</span>
        <el-upload
              action="http://localhost:8008/upload/goods/pics"
              :on-remove="handleRemove" :on-success="handleSuccess"
              :headers="headerObj"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

        <!-- <van-field name="uploader" label="汽车图片">
          <template #input>
            <van-uploader v-model="pics" :after-read="uploadImage" />
          </template>
        </van-field> -->

        <van-popup v-model="show" round position="bottom">
          <van-cascader title="请选择爱车品牌车系"
            :options="brands_trains" :field-names="fieldNames"
            @close="show = false" @finish="onFinish"
          />
        </van-popup>
        <van-popup v-model="showCardTime" position="bottom">
          <van-datetime-picker
            type="year-month"
            title="选择上牌时间" @confirm="confirm"
          />
        </van-popup>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker @confirm="onConfirm"
            show-toolbar
            :columns="options2"/>
        </van-popup>
        <van-popup v-model="showCarType" position="bottom">
          <van-picker @confirm="onConfirmCarType"
            show-toolbar
            :columns="options"/>
        </van-popup>

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="add">提交</van-button>
        </div>
      </van-form>
    <!-- 防止底部遮盖 -->
    <div style="height: 3rem;"></div>
  </div>
</template>

<script>
import Navbar from 'components/navbar/Navbar'
import Scroll from 'components/scroll/Scroll'

import {getCateList, getParams, removeTempFile, addGood} from 'network/user'
import { Toast } from 'vant';

export default {
  name: 'Sell',
  data() { 
    return {
      show: false,
      showCardTime: false,
      showPicker: false,
      showCarType: false,
      
      fieldNames: {
        text: 'name',
        value: 'name',
        children: 'children',
      },
      // 添加商品的基本表单信息对象
      addForm: {
        title: '111', 
        brand: '', 
        train: '', 
        master: '', 
        price: 0, 
        old_price: 0, 
        card_time: '', 
        odograph: 0, 
        is_in_store: 1, 
        tranfer: 0,
      },
      paramsForm: {
        is_business: '运营', 
        is_private: '私用', 
        engine_power: 0,
        is_auto: '自动', 
        car_type: '', 
        displacement: 0, 
        displace_reg: '国四', 
        seats: 4, 
        fuel_type: '汽油', 
        break: '1',
      },
      attrsForm: {
        firm: '大众',
        fuel_num: '92',
        size: '',
        length: '0',
        width: '0',
        height: '0',
        wheelbase: 0,
        cylinder: 4,
      },
      pics: [],
      // 父级分类数据
      brands_trains: [],
      // 选中父级
      selectedKeys: '',
      // 级别选项数据
      options: [],
      // 燃料类型选项数据
      options2: [],
      // 图片上传的请求头
      headerObj: {
        Authorization: 'Bearer ' + window.localStorage.getItem('front_token')
      },
    }
  },
  components: {
    Navbar,
    Scroll
  },
  created() {
    // 获取品牌车系数据
    this.getBrandTrain()
    // 获取参数数据
    this.getParams()
  },
  methods: {
    // 网络请求
    // 获取品牌车系数据
    async getBrandTrain() {
      const {data} = await getCateList({type: 3})
      if(!data) return
      if(data.meta.status !== 200) return Toast.fail('获取父级分类信息失败')
      // console.log(data.data);
      let brands = []
      let start = 65
      let key = 0
      let code = String.fromCharCode(start)
      brands[key] = {
        id: 0,
        name: code,
        children: []
      }
      for(let i of data.data.result.result) {
        if(i.initial === code) {
          brands[key].children.push(i)
        } else {
          start ++,
          key++
          code = String.fromCharCode(start)
          brands[key] = {
            id: 0,
            name: code,
            children: []
          }
          brands[key].children.push(i)
        }
      }
      this.brands_trains = brands
    },
    // 获取汽车级别数据
    async getParams() {
      const {data} = await getParams()
      if(!data) return
      if(data.meta.status !== 200) return Toast.fail('获取参数信息失败')
      let {car_type, fuel_type} = data.data.result
      for(let i of car_type) {
        if(i.car_type === 'undefined') continue
        this.options.push(i.car_type)
      }
      for(let i of fuel_type) {
        if(!i.fuel_type) continue
        this.options2.push(i.fuel_type)
      }
    },
    // 上传商品
    async add(){
      this.$refs.addform.validate().then(async () => {
        const {data} = await addGood(this.addForm, this.paramsForm, this.attrsForm, this.pics)
        if(!data) return
        if(data.meta.status !== 200)  return Toast.fail(`添加商品失败`)
        Toast.success(`添加商品成功`)
        this.$router.push('/home')
      }).catch((err) => {
        return err
      })
    },

    // 功能
    onFinish({ value, selectedOptions, tabIndex }) {
      this.addForm.brand = selectedOptions[1].name
      this.addForm.train = selectedOptions[2].name
      this.selectedKeys = this.addForm.brand + '/' + this.addForm.train
      this.addForm.master = localStorage.getItem('phone')
    },
    confirm(value) {
      this.addForm.card_time = `${value.getFullYear()}-${value.getMonth()+1}`
      this.showCardTime = false
    },
    onConfirm(value) {
      this.paramsForm.fuel_type = value
      this.showPicker = false
    },
    onConfirmCarType(value) {
      this.paramsForm.car_type = value
      this.showCarType = false
    },
    // 图片上传成功的钩子函数
    handleSuccess(response) {
      this.pics.push(response.data.temp_path)
    },
    // 移除图片的钩子函数
    async handleRemove(file) {
      // 获取将要删除的图片的临时路径
      const filePath = file.response.data.temp_path
      // 从添加表单中删除图片路径
      let index = this.pics.findIndex(x => x === filePath)
      this.pics.splice(index, 1)
      // 删除服务器中的暂时文件
      const {data} = await removeTempFile(filePath)
      if(!data) return
      if(data.meta.status !== 200) return Toast.fail('临时文件删除失败')
    },
  }
 }
</script>

<style lang='less' scoped>
/*
 1.位置属性(position, top, right, z-index, display, float等)
 2.大小(width, height, padding, margin)
 3.文字系列(font, line-height, letter-spacing, color- text-align等)
 4.背景(background, border等)
 5.其他(animation, transition等)
*/

  .sell {
    height: 100vh;
    height: calc(100vh - var(--vh-offset, 0px));
  }

  .wrapper{
    position: absolute;
    top: 55px;
    bottom: 60px;
    left: 0px;
    right: 0px;
  }

  .van-form {
    span {
      display: block;
      font-weight: bold;
      margin-top: 15px;
      margin-left: 12px;
    }
  }

  .el-button {
    margin-top: 10px;
    margin-left: 10px;
  }


</style>