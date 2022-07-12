// import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import MAddItemImport from '@/components/point-template/modal/MAddItemImport.vue'
import * as XLSX from 'xlsx'

describe('MAddItemImport', () => {
  const mockExcelJson = [
    ['kode', 'nama', 'chart of account', 'unit of measurement 1', 'unit of measurement 2', 'units converter 1', 'units converter 2', 'expired date', 'production number', 'group'],
    [1, 'nama1', 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 'nama2', 2, 2, 2, 2, 2, 2, 2, 2],
    [3, 'nama3', 3, 3, 3, 3, 3, 3, 3, 3],
    [4, 'nama4', 4, 4, 4, 4, 4, 4, 4, 4],
    [1, 'nama1', 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  const generateExcelFile = () => {
    const formatMockExcel = mockExcelJson.map((el) => {
      return { ...el }
    })
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    // const fileExtension = '.xlsx'
    const ws = XLSX.utils.json_to_sheet(formatMockExcel)
    const objWb = { Sheets: {}, SheetNames: ['data'] }
    objWb.Sheets.data = ws
    const excelBuffer = XLSX.write(objWb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    // return data
    // var excelString = ''
    // mockExcelJson.map(function (RowItem, RowIndex) {
    //   RowItem.forEach(function (ColItem, ColIndex) {
    //     excelString += ColItem + (ColIndex === RowItem.length - 1 ? '' : ',')
    //   })
    //   excelString += '\r\n'
    // })
    // console.log(excelString)
    // excelString = fileType + encodeURIComponent(excelString)
    // console.log(excelString)
    // const blob = new Blob([excelString], { type: fileType })
    console.log(data.size)
    return new File([data], 'test.xlsx', { type: fileType, lastModified: new Date().getTime() })
  }

  it('makes a call to persist the image on image upload', () => {
    // var str = ''

    // for (var i = 0; i < mockExcelJson.length; i++) {
    //   var line = []

    //   for (var index in mockExcelJson[i]) {
    //     line.push('"' + mockExcelJson[i][index] + '"')
    //   }

    //   str += line.join(';')
    //   str += '\r\n'
    // }
    // console.log(str)
    // // window.open("data:text/csv;charset=utf-8," + encodeURIComponent(str));
    // // // Mount the component
    console.log(generateExcelFile())
    const wrapper = mount(MAddItemImport)
    wrapper.vm.setValue(generateExcelFile())

    // // Mock FileReader.readAsDataURL() to be a function that returns null
    // const fileReaderSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null)

    // // Spy on the component’s persist() method
    // const persistSpy = jest.spyOn(wrapper.vm, 'persist')

    // // Manually trigger the component’s onChange() method
    // wrapper.vm.onChange(event)

    // // Assert that the FileReader object was called with the uploaded image
    // expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0])

    // // Assert that the component’s persist() method was called with the uploaded image
    // expect(persistSpy).toHaveBeenCalledWith(event.target.files[0])
  })
})
