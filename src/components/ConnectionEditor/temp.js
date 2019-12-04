jn()(t, [
  {
    key: "componentDidMount",
    value: function() {
      var e = this;
      (this.svg = Object(qb.f)(this.wrapper)
        .append("svg")
        .attr("data-graph-bg", "true")
        .attr("width", "100%")
        .attr("height", "100%")),
        (this.graph = this.svg.append("g")),
        this.svg.call(
          Object(Hb.a)()
            .scaleExtent([0.2, 5])
            .on("zoom", function() {
              return e.graph.attr("transform", qb.b.transform);
            })
        ),
        (this.link = this.graph
          .append("g")
          .attr("class", Gb.a.links)
          .selectAll("line")),
        (this.node = this.graph
          .append("g")
          .attr("class", Gb.a.nodes)
          .selectAll("g")),
        (this.force = Object(Fb.e)(this.nodes)
          .alphaDecay(0.01)
          .force("charge", Object(Fb.d)().strength(-20))
          .force(
            "collision",
            Object(Fb.b)().radius(function(e) {
              var t = e.type;
              return "root" == t ? 24 : "parent" == t ? 24 : 3;
            })
          )
          .force(
            "link",
            Object(Fb.c)(this.links)
              .id(function(e) {
                var t = e.id;
                return t;
              })
              .distance(function(e) {
                var t = e.source.type;
                return "root" == t ? 80 : "parent" == t ? 60 : 80;
              })
              .strength(function(e) {
                return "root" == e.source.type
                  ? 1
                  : "parent" == e.source.type && "parent" == e.target.type
                  ? 1
                  : "parent" == e.source.type
                  ? 0.4
                  : 1;
              })
          )),
        this.force.on("tick", function() {
          e.node.attr("transform", function(e) {
            return "translate(".concat(e.x, ",").concat(e.y, ")");
          }),
            e.link
              .attr("x1", function(e) {
                return e.source.x;
              })
              .attr("y1", function(e) {
                return e.source.y;
              })
              .attr("x2", function(e) {
                return e.target.x;
              })
              .attr("y2", function(e) {
                return e.target.y;
              });
        }),
        new kh.ResizeSensor(this.wrapper, this.handleResize),
        this.handleResize(),
        this.updateDOM(this.props);
    }
  },
  {
    key: "componentDidUpdate",
    value: function() {
      var e = this;
      this.props.nodes.forEach(function(t) {
        var a = e.nodes.find(function(e) {
          var a = e.id;
          return a == t.id;
        });
        if (a) (t.x = a.x), (t.y = a.y), (t.vx = a.vx), (t.vy = a.vy);
        else {
          var n = e.props.links.find(function(e) {
              var a = e.target;
              return a == t.id;
            }),
            i =
              n &&
              e.nodes.find(function(e) {
                var t = e.id;
                return t == n.source;
              });
          i
            ? ((t.x = i.x), (t.y = i.y))
            : ((t.x = e.centerX), (t.y = e.centerY));
        }
        delete t.fx, delete t.fy;
      });
      var t = Math.abs(this.nodes.length - this.props.nodes.length);
      (this.nodes = this.props.nodes),
        (this.links = this.props.links),
        this.force.nodes(this.nodes),
        this.force.force("link").links(this.links),
        0 < t && this.force.alpha(1).restart(),
        this.updateDOM(this.props);
    }
  },
  {
    key: "componentWillUnmount",
    value: function() {
      kh.ResizeSensor.detach(this.wrapper), this.force.stop();
    }
  },
  {
    key: "handleResize",
    value: function() {
      var e = this.wrapper.getBoundingClientRect(),
        t = e.width / 2,
        a = e.height / 2 - 46;
      this.force.force("center", Object(Fb.a)(t, a)),
        this.force.force("x", Object(Fb.f)(t).strength(-0.01)),
        this.force.force("y", Object(Fb.g)(a).strength(-0.01)),
        (this.centerX = t),
        (this.centerY = a);
    }
  },
  {
    key: "reset",
    value: function() {
      this.svg.call(Object(Hb.a)().transform, Hb.b),
        this.graph.attr("transform", Hb.b);
    }
  },
  {
    key: "getNode",
    value: function(e) {
      return this.nodes.find(function(t) {
        return t.id == e;
      });
    }
  },
  {
    key: "updateDOM",
    value: function(e) {
      var t = this,
        a = e.selectedId,
        n = this.links,
        i = this.nodes,
        o = this.node.data(i, function(e) {
          return e.id;
        }),
        r = o
          .enter()
          .append("g")
          .call(
            Object(jb.a)()
              .on("start", this.dragStarted)
              .on("drag", this.dragged)
              .on("end", this.dragEnded)
          );
      r.append("title"),
        r.append("circle").on("click", this.onNodeClick),
        r.append("text"),
        o.exit().remove();
      var l = r.merge(o);
      l.attr("class", function(e) {
        return tr()(Gb.a[e.type], {
          [Gb.a["-selected"]]: (e.entityId || e.id) == a
        });
      }),
        l
          .selectAll("text")
          .attr("dy", function(e) {
            var a = t.getNode(e.id);
            switch (a.type) {
              case "root":
                return 28;
              case "parent":
                return 22;
              case "leaf":
                return 15;
            }
          })
          .text(function(e) {
            return t.getNode(e.id).title;
          }),
        l.selectAll("circle").attr("r", function(e) {
          return "root" == e.type ? 16 : "parent" == e.type ? 8 : 3;
        }),
        (this.node = l),
        (this.link = this.link.data(n, function(e) {
          return e.source.id + "-" + e.target.id;
        })),
        this.link.exit().remove(),
        (this.link = this.link
          .enter()
          .append("line")
          .merge(this.link));
    }
  },
  {
    key: "onNodeClick",
    value: function(e) {
      this.props.onNodeClick && this.props.onNodeClick(e.entityId || e.id);
    }
  },
  {
    key: "dragStarted",
    value: function(e) {
      qb.b.active || this.force.alphaTarget(0.3).restart(),
        (e.fx = e.x),
        (e.fy = e.y);
    }
  },
  {
    key: "dragged",
    value: function(e) {
      (e.fx = qb.b.x), (e.fy = qb.b.y);
    }
  },
  {
    key: "dragEnded",
    value: function(e) {
      qb.b.active || this.force.alphaTarget(0), (e.fx = null), (e.fy = null);
    }
  },
  {
    key: "render",
    value: function() {
      var e = this,
        t = this.props,
        a = t.nodes,
        n = t.emptyFiller;
      return To.a.createElement(
        "div",
        {
          ref: function(t) {
            return (e.wrapper = t);
          },
          className: Gb.a.wrapper,
          onClick: this.onWrapperClick
        },
        1 == a.length && n ? n : null
      );
    }
  }
]);
