function kelas(max,min,siswa,jadwal) {

    let max_arr = Math.ceil(siswa/max)
    if (max_arr*min>siswa) {
        max_arr-=1
    }
    let sisa = siswa-(max_arr*min)
    let penambahan = Math.floor(sisa/max_arr)
    let penambahan2 = sisa%max_arr    
    console.log([max_arr,sisa,penambahan,penambahan2]);

    let str = ''
        for (let i = 0; i < max_arr; i++) {
            if (i<max_arr-penambahan2) {
                str += `kelas ${i+1} = ${min+penambahan} orang \n`
            }else{
                str +=`kelas ${i+1} = ${min+penambahan+1} orang \n` 
            }
        }       
    return  str

}
console.log(kelas(20,18,101))