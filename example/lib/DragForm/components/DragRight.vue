<!-- @format -->

<template>
  <div class="drag-side">
    <el-scrollbar>
      <el-collapse v-if="prop.id !== 0" v-model="activeNames">
        <el-collapse-item title="基础" name="base">
          <drag-right-item prefix="标签">
            <el-input v-model="prop.label" placeholder="请输入" />
          </drag-right-item>
          <drag-right-item prefix="绑定字段">
            <el-input
              v-model="prop.prop"
              :formatter="
                  (value:string) => value.replace(/[^_a-zA-Z0-9]+$/g, '')
                "
              :parser="(value:string) => value.replace(/[^_a-zA-Z0-9]+$/g, '')"
              placeholder="请输入英文、数字、下划线"
            />
          </drag-right-item>
          <drag-right-item v-if="prop.type === 'input'" prefix="默认值">
            <el-input
              v-model="prop.value"
              placeholder="请输入英文、数字、下划线"
            />
          </drag-right-item>
        </el-collapse-item>
        <el-collapse-item
          v-if="
            prop.type === 'select' ||
            prop.type === 'checkbox' ||
            prop.type === 'radio'
          "
          title="选项"
          name="option"
        >
          <drag-right-item prefix="选项数据">
            <el-switch
              v-model="prop.option!.useUrl"
              active-text="远程接口"
              inactive-text="本地数据"
            />
            <template v-if="prop.option!.useUrl">
              <el-input v-model="prop.option!.url">
                <template #prepend>接口地址</template>
              </el-input>
              <el-input v-model="prop.option!.key">
                <template #prepend>数据字段</template>
              </el-input>
              <el-input v-model="prop.option!.labelKey">
                <template #prepend>label字段</template>
              </el-input>
              <el-input v-model="prop.option!.valueKey">
                <template #prepend>value字段</template>
              </el-input>
            </template>
            <template v-else>
              <div
                v-for="(item, index) in prop.option!.data"
                :key="item.id"
                class="input-wrap option-item"
              >
                <el-input v-model="item.label">
                  <template #prepend>标签</template>
                </el-input>
                <el-input v-model="item.value">
                  <template #prepend>值</template>
                </el-input>
                <div class="btns">
                  <el-button
                    v-if="index === prop.option!.data!.length - 1"
                    @click="plusOptions"
                    >+</el-button
                  >
                  <el-button v-if="index !== 0" @click="reduceOptions(index)"
                    >-</el-button
                  >
                </div>
              </div>
            </template>
          </drag-right-item>
          <drag-right-item v-if="prop.option?.data" prefix="默认值">
            <template v-if="prop.option!.useUrl">
              <el-input v-if="prop.type !== 'checkbox'" v-model="prop.value">
                <template #prepend>值</template>
              </el-input>
              <template v-else>
                <el-button
                  v-if="!defaultValue.length"
                  text
                  @click="plusDefaultValue"
                >
                  添加默认值
                </el-button>
                <div
                  v-for="(item, index) in defaultValue"
                  :key="item.id"
                  class="input-wrap"
                >
                  <el-input v-model="item.value" @change="changeDefaultValue">
                    <template #prepend>值</template>
                  </el-input>
                  <div class="btns">
                    <el-button
                      v-if="index === defaultValue.length - 1"
                      @click="plusDefaultValue"
                      >+</el-button
                    >
                    <el-button
                      v-if="index !== 0"
                      @click="reduceDefaultValue(index)"
                      >-</el-button
                    >
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              <el-select
                v-if="prop.type === 'select'"
                v-model="prop.value"
                placeholder="请选择"
              >
                <el-option
                  v-for="option in prop.option.data"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>

              <el-checkbox-group
                v-if="prop.type === 'checkbox'"
                v-model="prop.value"
              >
                <el-checkbox
                  v-for="option in prop.option.data"
                  :key="option.value"
                  :value="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-checkbox>
              </el-checkbox-group>

              <el-radio-group v-if="prop.type === 'radio'" v-model="prop.value">
                <el-radio
                  v-for="option in prop.option.data"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-radio-group>
            </template>
          </drag-right-item>
        </el-collapse-item>
        <el-collapse-item
          v-if="prop.type === 'upload'"
          title="上传"
          name="upload"
        >
          <drag-right-item prefix="默认值">
            <div v-if="Array.isArray(prop.value)">
              <el-button v-if="!prop.value.length" text @click="plusUpload">
                添加默认值
              </el-button>
              <div
                v-for="(item, index) in prop.value"
                :key="item.id"
                class="input-wrap"
              >
                <el-input v-model="item.url" />
                <el-button @click="plusUpload">+</el-button>
                <el-button @click="reduceUpload(index)">-</el-button>
              </div>
            </div>
          </drag-right-item>
          <drag-right-item prefix="上传地址">
            <el-input v-model="prop.upload!.url" placeholder="请输入" />
          </drag-right-item>
          <drag-right-item prefix="列表类型"
            ><el-select v-model="prop.upload!.type" placeholder="请选择">
              <el-option
                v-for="item in listTypeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              /> </el-select
          ></drag-right-item>
          <drag-right-item prefix="上传数量">
            <el-input-number
              v-model="prop.upload!.count"
              :min="1"
              :precision="0"
            />
          </drag-right-item>
          <drag-right-item prefix="接口字段">
            <el-input v-model="prop.upload!.key">
              <template #prepend>数据字段</template>
            </el-input>
            <el-input v-model="prop.upload!.urlKey" placeholder="没有则不填">
              <template #prepend>图片字段</template>
            </el-input>
          </drag-right-item>
        </el-collapse-item>
        <el-collapse-item
          v-if="prop.type === 'datePicker'"
          title="时间"
          name="date"
        >
          <drag-right-item prefix="类型">
            <el-select v-model="prop.datePicker!.type" placeholder="请选择">
              <el-option
                v-for="item in datePickerOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </drag-right-item>
          <drag-right-item prefix="占位符">
            <el-input
              v-model="prop.datePicker!.placeholder"
              placeholder="非范围选择占位符"
            />
            <el-input
              v-model="prop.datePicker!.startPlaceholder"
              placeholder="范围选择开始占位符"
            />
            <el-input
              v-model="prop.datePicker!.endPlaceholder"
              placeholder="范围选择结束占位符"
            />
          </drag-right-item>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="DragRight">
import { ref } from 'vue';
import DragRightItem from './DragRightItem.vue';
import useProp from './utils';

const activeNames = ref('base');
const {
  prop,
  plusOptions,
  reduceOptions,
  defaultValue,
  changeDefaultValue,
  plusDefaultValue,
  reduceDefaultValue,
  listTypeOptions,
  plusUpload,
  reduceUpload,
  datePickerOptions,
} = useProp();
</script>

<style lang="scss" scoped>
.option-item {
  margin-left: -5em;
}

.input-wrap {
  display: flex;

  .btns {
    flex: 0 0 90px;
  }
}
</style>
