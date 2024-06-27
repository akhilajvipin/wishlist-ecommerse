import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproduct:any[],searchTerm:string,propsName:string): any[]{
     
    const result :any[]=[]
    if(!allproduct || searchTerm==" " ||propsName==""){
      
      return allproduct
    }
    allproduct.forEach((item:any)=>{
      if(item[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item);
      }
      else{
       
      }
    })
    return result
    
    }
   
   
  
  }


