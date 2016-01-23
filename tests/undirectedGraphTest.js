var graphs=require('../lib/graph');
var assert=require('chai').assert;

describe("add Edges",function(){
	it("should be able to determine if an edge is present",function(){
		var g=new graphs.UndirectedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addEdge('A','B');
		assert.ok(g.hasEdgeBetween('A','B'));
		assert.ok(g.hasEdgeBetween('B','A'));
	});
});

describe("quantities",function(){
	it("should provide the order of a graph with a single vertex",function(){
		var g=new graphs.UndirectedGraph();
		g.addVertex('A');
		assert.equal(1,g.order());
	});
	it("should provide the order of a graph with multiple vertices",function(){
		var g=new graphs.UndirectedGraph();
		g.addVertex('A');
		g.addVertex('B');
		assert.equal(2,g.order());
	});
	it("should provide the order of an empty graph",function(){
		var g=new graphs.UndirectedGraph();
		assert.equal(0,g.order());
	});
	it("should provide the size of a graph with a single edge",function(){
		var g=new graphs.UndirectedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addEdge('A','B');

		assert.equal(1,g.size());
	});
	it("should provide the size of a graph with multiple edges",function(){
		var g=new graphs.UndirectedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');
		g.addEdge('A','B');
		g.addEdge('B','C');

		assert.equal(2,g.size());
	});
	it("should provide the size of a graph with no edges",function(){
		var g=new graphs.UndirectedGraph();
		g.addVertex('A');
		g.addVertex('B');

		assert.equal(0,g.size());
	});
});

describe("paths",function(){
	var g;
	beforeEach(function(){
		g=new graphs.UndirectedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');
		g.addVertex('D');
		g.addVertex('E');
	});

	it("should determine a path between two adjacent vertices",function(){
		g.addEdge('A','B');

		var path=g.pathBetween('A','B')

		assert.deepEqual(['A','B'],path);
	});

	it("should determine a path between non-adjacent vertices",function(){
		g.addEdge('A','B');
		g.addEdge('B','C');
		var path=g.pathBetween('A','C')
		assert.deepEqual(['A','B','C'],path);
	});

	it("should determine a path between vertices when there is only a single path",function(){
		g.addEdge('A','B');
		g.addEdge('B','C');
		g.addEdge('B','D');
		g.addEdge('D','E');

		var path=g.pathBetween('A','E');

		assert.equal(4,path.length);
		assert.deepEqual(['A','B','D','E'],path);
	});

	it("should determine a path between vertices regardless of order of edge insertion",function(){
		g.addEdge('A','B');
		g.addEdge('B','C');
		g.addEdge('B','D');
		g.addEdge('D','E');

		var path=g.pathBetween('C','E')

		assert.deepEqual(['C','B','D','E'],path);
	});

	it("should determine an empty path where none exists",function(){
		g.addEdge('A','B');

		var path=g.pathBetween('C','E')

		assert.deepEqual([],path);
	});

	it("should determine a path between two vertices where more than one path exists",function(){
		g.addEdge('A','C');
		g.addEdge('A','B');
		g.addEdge('C','D');
		g.addEdge('B','D');
		g.addEdge('D','E');

		var path=g.pathBetween('A','E')

		try {
			assert.deepEqual(['A','B','D','E'],path);
		} catch (e) {
			assert.deepEqual(['A','C','D','E'],path);
		}
	});
	it("should determine the farthest vertex from a given vertex for a simple graph",function(){
		g.addEdge('A','B');

		assert.equal('B',g.farthestVertex('A'));
	});
	it("should determine the farthest vertex from a given vertex for a simple graph with two edges",function(){
		g.addEdge('A','B');
		g.addEdge('B','C');
		assert.equal('C',g.farthestVertex('A'));
	});
	it("should determine the farthest vertex from a given vertex with outdegree > 1",function(){
		g.addEdge('A','B');
		g.addEdge('A','D');
		g.addEdge('B','C');
		assert.equal('C',g.farthestVertex('A'));
	});
	it("should determine the farthest vertex from a given vertex with many vertices having outdegree > 1",function(){
		g.addEdge('A','B');
		g.addEdge('A','D');
		g.addEdge('D','E');
		g.addEdge('B','C');
		g.addEdge('C','F');
		g.addEdge('F','G');

		assert.equal('G',g.farthestVertex('A'));
		assert.equal('G',g.farthestVertex('E'));
	});
});
