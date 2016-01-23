var graphs = {};
module.exports = graphs;

graphs.UndirectedGraph = function(){
  this.graph = {};
  this.allEdges = [];
}

graphs.UndirectedGraph.prototype = {
  addVertex : function(vertex){
    this.graph[vertex] = [];
  },
  addEdge : function(from,to){
    this.allEdges.push(from);
    this.graph[from].push(to);
    this.graph[to].push(from);
  },
  hasEdgeBetween : function(from,to){
    return this.graph[from].indexOf(to)>=0;
  },
  order : function(){
    return Object.keys(this.graph).length;
  },
  size : function(){
    return this.allEdges.length;
  },
  pathBetween : function(from,to,visited){
		var visited = visited || [];
		if(from == to)
			return visited.concat(from);
		for(var index in this.graph[from]){
			var vertex = this.graph[from][index];
			if(visited.indexOf(vertex)==-1){
				var path =  this.pathBetween(vertex,to,visited.concat(from));
        if(path[path.length-1]==to) return path;
      }
		}
		return [];
	},
  farthestVertex : function(source){
    var farthestVertex;
    var vertices = 0;
    var allVertex = Object.keys(this.graph);
    for(var vertex in allVertex){
        var path = this.pathBetween(source,allVertex[vertex]);
        if(path.length>vertices){
          vertices = path.length;
          farthestVertex = allVertex[vertex];
        }
    }
    return farthestVertex;
  }
}
