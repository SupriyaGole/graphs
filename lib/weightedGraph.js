var graphs = {};
module.exports = graphs;

var getPath = function(from,to,parent){
  var path = [];
  path.push(to);
  while(path[path.length-1]!=from){
    path.push(parent[to]);
    to = parent[to];
  }
  return path.reverse();
};

var getEdge = function(path,self){
  var edges = [];
  for(var index in self){
    for(var j in self[index]){
      var edge = self[index][j];
      for(var i=0;i<path.length-1;i++){
        if(edge.source == path[i] && edge.destination == path[++i])
          edges.push(edge);
      }
    }
  }
  edges.reduce(function(e1,e2){
    if(e1.source == e2.source){
      return e1.weight < e2.weight ? edges.splice(edges.indexOf(e2),1) : edges.splice(edges.indexOf(e1),1);
    }
  });
  return edges;
}


graphs.WeightedGraph = function(){
  this.graph = {};
}

graphs.WeightedGraph.prototype = {
  addVertex : function(vertex){
    this.graph[vertex] = [];
  },
  addEdge : function(edge){
    this.graph[edge.source].push(edge);
  },
  shortestPath : function(from,to){
    var self = this.graph;
    var distances = {};
    var allVertex = [];
    var parent = {};
    var edges = {};

    var vertices = Object.keys(this.graph);
    for(var i=0;i<vertices.length;i++){
      distances[vertices[i]]=Infinity;
      parent[vertices[i]]=undefined;
      edges[vertices[i]] = this.graph[vertices[i]];
      allVertex.push(vertices[i]);
    }
    distances[from]=0;
    parent[from] = from;
    while(allVertex.length>0){
        var sortedVertex = allVertex.reduce(function(v1,v2){
          return distances[v1] < distances[v2] ? v1 : v2;
        });
        for(var i=0;i<this.graph[sortedVertex].length;i++){
          var edge = this.graph[sortedVertex][i];
          var combinedWeight = edge.weight + distances[edge.source];
          if(combinedWeight < distances[edge.destination]){
            distances[edge.destination] = combinedWeight;
            parent[edge.destination] = edge.source;
          }
        }
        allVertex.splice(allVertex.indexOf(sortedVertex),1);
    }
    var path = getPath(from,to,parent);
    return getEdge(path,self);
  }
}

graphs.Edge = function(edgeName,from,to,weight){
  this.edgeName = edgeName;
  this.source = from;
  this.destination = to;
  this.weight = weight;
}
