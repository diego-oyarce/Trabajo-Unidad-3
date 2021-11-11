var alfabetoAutomata = [];
var alfabeto = [];
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var arrayIdEstados = [];
// var arrayLabelEstados = [];
var arrayEventos = []; //Conexiones entre nodos
// var arrayEstadosFinales = []; 
var container = document.getElementById('afd');
var data = {
  nodes: nodes,
  edges: edges
};
var nextId = 0;

let callbAdd;
let callbAddE;

var locales = {
    en: {
        edit:"Editar",
        del:"Eliminar selección",
        back:"Volver",
        addNode:"Agregar Estado",
        addEdge:"Agregar Transición",
        editNode:"Editar Estado",
        editEdge:"Editar Transición",
        addDescription:"Click en un espacio vacío para agregar un estado",
        edgeDescription:"Click sobre estado-origen y arrastrar hasta estado-final para conectarlos",
        editEdgeDescription:""
    }
};

var options = {
    autoResize:true,
    height:'100%',
    width:'100%',
    locale: 'en',
    locales: locales,
    clickToUse: true,
    configure:{
        enabled:false,
        filter: 'nodes,edges',
        showButton:true
    },
    edges:{
        length:300,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow"
          },
          middle: {
            enabled: true,
            scaleFactor: 1,
            type: "image"
          },
          from: {
            enabled: false,
            scaleFactor: 1,
            type: "arrow"
          }
        },
    },
    interaction:{
        dragNodes:true,
        dragView:true,
        hover:true,
        multiselect:true,
        navigationButtons:false
    },
    manipulation:{
        enabled:true,
        initiallyActive: true,
        addNode: function(data, callback){
            var span = document.getElementById('operation-state');
            var nodeSaveButton = document.getElementById('saveButton-state');
            var nodeCancelButton = document.getElementById('cancelButton-state');
            var node_div = document.getElementById('state-popUp');
            span.innerHTML = "Añadir Estado";
            nodeSaveButton.onclick = nodeSaveData.bind(this,data,callback);
            nodeCancelButton.onclick = nodeClearPopUp.bind();
            node_div.style.display = 'block';
            callbAdd = callback;
        },
        addEdge: function(data, callback){
            var edgeSpan = document.getElementById('operation-transition');
            var edgeSaveButton = document.getElementById('saveButton-transition');
            var edgeCancelButton = document.getElementById('cancelButton-transition');
            var edge_div = document.getElementById('transition-popUp');
            edgeSpan.innerHTML = "Añadir Transición";
            edgeSaveButton.onclick = edgeSaveData.bind(this,data,callback);
            edgeCancelButton.onclick = edgeClearPopUp.bind();
            edge_div.style.display = 'block';
            callbAddE = callback;
        }, 
        editEdge:false,   
        // deleteNode:true,
        deleteEdge:true
    }
};

var network = new vis.Network(container, data, options);

function guardarAlfabeto(){
  alfabetoAutomata = document.getElementById('alfabeto-automata').value;
  alfabeto = alfabetoAutomata.split(';');
  alfabeto.sort();
  if(alfabeto.length < 2){
    alert("El alfabeto ingresado es muy corto. Vuelva a intentarlo.");
    return false;
  }
  else{
    alert("Alfabeto ingresado correctamente. Alfabeto: " + alfabeto);
    return true;
  }
}

function nodeClearPopUp() {
    var nodeSaveButton = document.getElementById('saveButton-state');
    var nodeCancelButton = document.getElementById('cancelButton-state');
    nodeSaveButton.onclick = null;
    nodeCancelButton.onclick = null;
    var node_div = document.getElementById('state-popUp');
    node_div.style.display = 'none';
}

function nodeSaveData(data,callback) {
    var nodeIdInput = document.getElementById('state-id');
    var finalState = document.getElementById('state-final').value.toLowerCase();
    data.id = nodeIdInput.value;
    if(alfabeto.length == 0){
      alert("CUIDADO! Aun no se ha ingresado el alfabeto. Ingresa el alfabeto y vuelve a intentarlo");
      return null;
    }
    else{
      if((finalState == 'si') || (finalState == 'no')){
        if(nodes.length == 0){
          if(finalState == 'si'){
            arrayIdEstados.push(nextId);
            nodes.add({id:nextId, label:nodeIdInput.value+": Estado Inicial y Estado Final", title:"Estado Inicial y Final", final: 1, inicial: 1});
            // arrayEstadosFinales.push(1);
            // arrayLabelEstados.push(data.id);
          }
          else{
            arrayIdEstados.push(nextId);
            nodes.add({id:nextId, label:nodeIdInput.value + ": Estado Inicial", title:"Estado Inicial", final: 0, inicial: 1});
            // arrayEstadosFinales.push(0);
            // arrayLabelEstados.push(data.id);
          }
        }
        else{
          if(finalState == 'si'){
            arrayIdEstados.push(nextId);
            nodes.add({id:nextId, label:nodeIdInput.value + ": Estado Final", title:"Estado Final", final: 1, inicial: 0});
            // arrayEstadosFinales.push(1);
            // arrayLabelEstados.push(data.id);
          }
          else{
            arrayIdEstados.push(nextId);
            nodes.add({id:nextId, label:nodeIdInput.value, final: 0, inicial: 0});
            // arrayEstadosFinales.push(0);
            // arrayLabelEstados.push(data.id);
          }
        }
        nextId++;
        nodeClearPopUp();
        network.redraw();
        callback(data);
      }
      else{
        alert("Se debe indicar si el estado ingresado es final o no. Ingrese 'si' o 'no'.");
        return null;
      }
    }
}

function edgeClearPopUp(){
    var edgeSaveButton = document.getElementById('saveButton-transition');
    var edgeCancelButton = document.getElementById('cancelButton-transition');
    edgeSaveButton.onclick = null;
    edgeCancelButton.onclick = null;
    var edge_div = document.getElementById('transition-popUp');
    edge_div.style.display = 'none';
}

function edgeSaveData(data,callback){
    var edgeLabelInput = document.getElementById('transition-label');
    data.label = edgeLabelInput.value;
    if(edgeLabelInput.length > 1){
      alert("Solo se permite ingresar un caracter.");
      return null;
    }
    else{
      if(alfabeto.includes(data.label)){
        arrayEventos.push({from:data.from, to:data.to, evento:data.label});
      }
      else{
        alert("El evento ingresado no pertenece al alfabeto. Intente nuevamente.");
        return null;
      }
      edgeClearPopUp();
      callback(data);
    }
}


function obtenerER(){
  crearNuevoInicialFinal();
}


function crearNuevoInicialFinal(){
  let newNodes = []; 
  let newEdges = [];
  let idIni;
  let idFinal = [];
  let idInicial = nextId;
  let idFinalF = nextId + 1;
  let cont = 0;
  newNodes.push({id:idInicial, label:"I: Estado Inicial", title:"Estado Inicial", final: 0, inicial: 1, exp: ''});
  newNodes.push({id:idFinalF, label:"F: Estado Final", title:"Estado Final", final: 1, inicial: 0, exp: ''});
  for(let a of nodes._data.entries()){
    let ingresado = false;
    let label;
    if(a[1].inicial==1){
      idIni = a[1].id;
    }
    if(a[1].final == 1){
      idFinal.push(a[1].id);
    }
    newNodes.push({id: a[1].id, label: String(a[1].label).includes(':')?String(a[1].label).split(':')[0]:String(a[1].label), final:0, inicial:0, exp: '' });
  }
  for(let b of edges._data.entries()){
    newEdges.push({from: b[1].from, label: b[1].label, to: b[1].to, exp: ''});
  }
  newEdges.push({from: idInicial, label: 'E', to: idIni, exp: ''});
  idFinal.forEach((e) =>{
    newEdges.push({from: e, label: 'E', to: idFinalF, exp: ''});
  })

  console.log(newEdges);
  console.log(newNodes);
  console.log(newEdges.length);

  // newEdges.forEach((e, idx) => {
  //   let cantidadSalidasRepetidas = 0;

  //   newEdges.forEach(e1 =>{
  //     if(e.to == e1.to && e.from == e1.from ) cantidadSalidasRepetidas ++;
  //   })

  //   if(cantidadSalidasRepetidas > 1){
  //     let newExp = e.exp ? e.exp : e.label == 'E' ? '' : e.label;
  //     newEdges.forEach((e1, idx1) =>{
  //       if(e.to == e1.to && e.from == e1.from && idx1 != idx){
  //         if(newExp) newExp += `+${e1.exp ? e1.exp : e1.label == 'E' ? '' : e1.label}`;
  //         else newExp = e1.exp ? e1.exp : e1.label == 'E' ? '' : e1.label;
  //         newEdges.splice(idx1,1);
  //       }
  //     })
  //     e.exp = newExp;
  //   }

  // })
  console.log(newEdges.length);
  //transiciones bucles
  
  console.log(newEdges.length);

  //Reducción de transiciones
  while(newEdges.length != 1 && cont <= 100){
    for(let i = 0; i < newNodes.length; i++){
      for(let j = 0; j < newEdges.length; j++){
        if(newEdges[j].to == newNodes[i].id && newEdges[j].to == newEdges[j].from){
          let newExp = newNodes[i].exp ? newNodes[i].exp : '';
          newExp += newEdges[j].exp ? newExp ? '+' + '('+newEdges[j].exp+')*' : '('+newEdges[j].exp+')*' : newEdges[j].label == 'E'? '' : newExp ? '+' + '('+newEdges[j].label+')*' : '('+newEdges[j].label+')*'; 
          newNodes[i].exp = (newNodes[i].exp ? '(':'') +newExp+(newNodes[i].exp ? ')':'') ;
        }
      }
    }

    newEdges = newEdges.filter((edges)=>{
      if(edges.from != edges.to){
        return true;
      }
    })

    let tmpNewEdges = [];
    for(let i = 0; i < newNodes.length; i++){
      
      for(let j = 0; j < newEdges.length; j++){
        let cantidadSalidasRepetidas = 0;
        for(let z = j; z < newEdges.length; z++){
          if(newEdges[j].to == newEdges[z].to && newEdges[j].from == newEdges[z].from && newEdges[j].from == newNodes[i].id ) cantidadSalidasRepetidas++;
        }
        if(cantidadSalidasRepetidas > 1){
            let newExp = newEdges[j].exp ? '('+newEdges[j].exp+')' : newEdges[j].label == 'E'? '' : '('+newEdges[j].label+')';

            for(let z = j + 1; z < newEdges.length; z++){
              if(newEdges[j].to == newEdges[z].to && newEdges[j].from == newEdges[z].from && newEdges[j].from == newNodes[i].id ){
                newExp += newExp ? newEdges[z].exp ? '+' + '('+newEdges[z].exp+')' : newEdges[z].label == 'E' ? '' : '+' + '('+newEdges[z].label+')' : newEdges[z].exp ? newEdges[z].exp: newEdges[z].label == 'E' ? '' : newEdges[z].label;
                newEdges[z].to = 'e';
                newEdges[z].from = 'e';
              }
            }
            tmpNewEdges.push({from: newEdges[j].from, label: newExp ? '' : 'E', exp: '('+newExp+')', to: newEdges[j].to});
            newEdges[j].to = 'e';
            newEdges[j].from = 'e';

        }
      }

      
      newEdges = newEdges.filter(edge =>{
        if(edge.to != 'e') return true;
      })
    }

    tmpNewEdges.forEach((e)=>{
      newEdges.push(e);
    })

    for(let i = 0; i< newNodes.length; i++ ){
      if(newNodes[i].id != idFinalF && newNodes[i].id != idInicial){
        newEdges.forEach((entrada, idxEntrada)=>{
          if(entrada.to == newNodes[i].id){
            newEdges.forEach((salida)=>{
              if(salida.from == newNodes[i].id){
                let newExp = entrada.exp ? entrada.exp : entrada.label == 'E' ? '' : entrada.label;
                if(newNodes[i].exp) newExp += newNodes[i].exp;
                newExp += salida.exp ? salida.exp : salida.label == 'E' ? '' : salida.label;
                newEdges.push({from: entrada.from, label: newExp ? '' : 'E', exp: newExp, to: salida.to});
              }
            }) 
            //newEdges.splice(idxEntrada, 1);
          }
        })
        newEdges = newEdges.filter((salidas)=>{
          if(salidas.from != newNodes[i].id){
            return true;
          }
        })
        newEdges = newEdges.filter((entradas)=>{
          if(entradas.to != newNodes[i].id){
            return true;
          }
        })
        newNodes.splice(i, 1);
        break;
      }
    }
    cont++;
  
    // newEdges.forEach((e, idx) => {
    //   if(e.to == idFinalF && e.from != idInicial){
    //     let cantidadSalidas = 0;
    //     let idxNodeDel;
  
    //     newEdges.forEach(e1 =>{
    //       if(e.from == e1.from ) cantidadSalidas ++;
    //     })
  
    //     if(cantidadSalidas == 1){
    //       newEdges.forEach(e1 =>{
    //         if(e1.to == e.from){
    //           newNodes.forEach((n, idx)=>{
    //             if(n.id == e.from){
    //               let newExp = e1.exp ? e1.exp : e1.label == 'E' ? '' : e1.label;
    //               if(n.exp) newExp += n.exp;
    //               newExp += e.exp ? e.exp : e.label == 'E' ? '' : e.label;
    //               e1.exp = newExp;
    //               e1.to = e.to;
    //               idxNodeDel = idx;
    //             } 
    //           })
    //         }
    //       })
    //       newEdges.splice(idx, 1);
    //       newNodes.splice(idxNodeDel, 1);
    //     }
        
    //   }
    // })
  }
  
  alert('Expresión Regular Encontrada: ' + newEdges[0].exp);

}