import { React, useState } from "react";
import HackerEnvio from "./HackerEnvio";

function BookShelf(title, resourceObjs) {
  const resourceCenter = {
    resourceTopics: [
      {
        topicTitle: "Algorithm Complexity",
        topicDescription:
          "Big O notation is the standard language engineers use to describe how the runtime or space requirements of an algorithm grow as input size increases. It expresses an upper bound on an algorithm's time or space complexity in the worst case. Common complexities range from O(1) (constant time, independent of input size) to O(log n) (logarithmic, e.g. binary search), O(n) (linear), O(n log n) (linearithmic, e.g. merge sort), and O(n²) (quadratic, e.g. nested loops). When analyzing an algorithm, constants and lower-order terms are dropped—O(2n + 5) simplifies to O(n)—because they become insignificant as input grows. Space complexity measures auxiliary memory allocated beyond the input itself. Mastering Big O analysis is essential for coding interviews: interviewers expect candidates to state both time and space complexity for every solution and reason about trade-offs.",
        addtlVideos: [
          {
            label: "Big O Notation — HackerRank",
            url: "https://www.youtube.com/embed/v4cd1O4zkGw",
          },
          {
            label:
              "Introduction to Big O Notation and Time Complexity — CS Dojo",
            url: "https://www.youtube.com/embed/D6xkbGLQesk",
          },
        ],
      },
      {
        topicTitle: "Linear Structures",
        topicDescription:
          "Linear data structures arrange elements sequentially, where each element has at most one predecessor and one successor. Arrays store elements in contiguous memory locations, providing O(1) random access by index but O(n) insertion and deletion due to shifting. Linked lists consist of nodes holding data and a pointer to the next node; singly linked lists traverse in one direction, doubly linked lists in both—enabling O(1) insertions and deletions at known positions but O(n) access by index. Stacks follow Last-In, First-Out (LIFO) order with O(1) push and pop operations, commonly used for recursion simulation, undo systems, and expression parsing. Queues follow First-In, First-Out (FIFO) order with O(1) enqueue and dequeue, used in BFS traversal, task scheduling, and message passing.",
        addtlVideos: [
          {
            label: "Introduction to Data Structures — MyCodeSchool",
            url: "https://www.youtube.com/embed/92S4zgXN17o",
          },
          {
            label: "Data Structures: Introduction to Stack — MyCodeSchool",
            url: "https://www.youtube.com/embed/F1F2imiOJfk",
          },
        ],
      },
      {
        topicTitle: "Priority & Hashing",
        topicDescription:
          "A min-heap is a complete binary tree where every parent node is less than or equal to its children, guaranteeing that the minimum element is always at the root. Insertion and extract-min both run in O(log n). Priority queues are an abstract data type built on top of heaps: each element has a priority, and the structure always serves the highest-priority element first—used in graph algorithms like Dijkstra's, job scheduling, and hospital triage systems. Hash tables map keys to array indices using a hash function, providing average O(1) insertion, deletion, and lookup. Collisions—when two keys hash to the same index—are resolved via chaining (each bucket holds a linked list of entries) or open addressing (probing for the next available slot in the array). Implementing a hash table using only arrays is a common direct interview exercise.",
        addtlVideos: [
          {
            label: "Heaps, Heapsort, and Priority Queues — Inside Code",
            url: "https://www.youtube.com/embed/pLIajuc31qk",
          },
          {
            label: "Binary Heaps for Priority Queues — Back to Back SWE",
            url: "https://www.youtube.com/embed/-WEku8ZnynU",
          },
        ],
      },
      {
        topicTitle: "Sorting Algorithms",
        topicDescription:
          "Sorting algorithms are foundational interview topics that illustrate key algorithm design trade-offs. Selection sort (O(n²), in-place) repeatedly finds the minimum unsorted element and swaps it into position—simple but slow. Insertion sort (O(n²) worst, O(n) best) works like sorting playing cards: it builds a sorted prefix by inserting each new element at the correct position; it is fast on nearly-sorted data. Merge sort (O(n log n), stable) uses divide-and-conquer: split the array in half, recursively sort both halves, then merge—requires O(n) extra space but guarantees consistent performance. Quicksort (O(n log n) average, O(n²) worst) selects a pivot, partitions elements around it, and recursively sorts each partition—in-place and fast in practice, but pivot choice matters to avoid worst-case behavior on already-sorted data.",
        addtlVideos: [
          {
            label: "The Quicksort Sorting Algorithm — Back to Back SWE",
            url: "https://www.youtube.com/embed/uXBnyYuwPe8",
          },
          {
            label: "Merge Sort in 3 Minutes",
            url: "https://www.youtube.com/embed/4VqmGXwpLqc",
          },
        ],
      },
      {
        topicTitle: "Tree Types",
        topicDescription:
          "A Binary Search Tree (BST) is a binary tree where every node's left subtree contains values less than the node and the right subtree contains values greater—enabling O(log n) average search, insert, and delete. Tries (prefix trees) store strings character by character; each node represents one character, making prefix lookups and autocomplete O(m) where m is the string length. N-ary trees generalize binary trees to allow any number of children per node. Balanced BSTs—AVL trees (strict height balance), Red-Black trees (relaxed balance with color properties), and Splay trees (self-adjusting via splaying)—guarantee O(log n) worst-case operations by preventing degeneracy into a linked list.",
        addtlVideos: [
          {
            label: "Binary Search Tree Introduction — William Fiset",
            url: "https://www.youtube.com/embed/JfSdGQdAzq8",
          },
          {
            label: "Binary Tree in Data Structure — Jenny's Lectures",
            url: "https://www.youtube.com/embed/vvey2QCs98o",
          },
        ],
      },
      {
        topicTitle: "Tree Traversal",
        topicDescription:
          "Tree traversal defines the order in which nodes are visited. Breadth-First Search (BFS), also called level-order traversal, explores all nodes at the current depth before moving deeper, using a queue—ideal for finding shortest paths in unweighted graphs and level-by-level processing. Depth-First Search (DFS) dives as deep as possible along a branch before backtracking; it has three variants: Inorder (left → root → right) visits BST nodes in ascending sorted order; Preorder (root → left → right) is used for tree copying and serialization; Postorder (left → right → root) is used for tree deletion and evaluating expression trees. BFS excels when the answer is near the root; DFS is better for full-path aggregation like height or path sums.",
        addtlVideos: [
          {
            label: "Binary Search Tree Traversals — William Fiset",
            url: "https://www.youtube.com/embed/k7GkEbECZK0",
          },
          {
            label: "Binary Tree Traversal — Jenny's Lectures",
            url: "https://www.youtube.com/embed/e_Wv_pH4Se8",
          },
        ],
      },
      {
        topicTitle: "Graph Representations",
        topicDescription:
          "Graphs model relationships between entities (vertices) via connections (edges). There are three standard representations. An Adjacency Matrix is a V×V boolean grid where matrix[i][j] = 1 indicates an edge; it provides O(1) edge lookup but requires O(V²) space—best for dense graphs. An Adjacency List maps each vertex to a list of its neighbors, using O(V+E) space—efficient for sparse graphs and most real-world networks. Objects & Pointers represent each node as an object with references to neighbor objects—the most OOP-natural approach and the most flexible. Beyond representation, important graph algorithms include Topological Sort (ordering nodes in a Directed Acyclic Graph), and understanding NP-Complete problems like the Traveling Salesman Problem (TSP).",
        addtlVideos: [
          {
            label: "Graph Theory Introduction — William Fiset",
            url: "https://www.youtube.com/embed/eQA-m22wjTQ",
          },
          {
            label: "P vs NP and NP-Complete Problems Explained",
            url: "https://www.youtube.com/embed/_YZafSo3sho",
          },
        ],
      },
      {
        topicTitle: "Dynamic Programming",
        topicDescription:
          "Dynamic programming (DP) is a technique for solving problems with two key properties: overlapping subproblems (the same subproblem is solved multiple times in a naive recursion) and optimal substructure (the optimal solution to the whole problem incorporates optimal solutions to subproblems). Memoization (top-down) solves the problem recursively and caches results in a table to avoid recomputation. Tabulation (bottom-up) iteratively fills a table starting from base cases, building toward the final answer without recursion overhead. The 0/1 Knapsack Problem—given items with weights and values and a capacity limit, maximize total value—is the canonical DP benchmark interviewers use to test DP fundamentals. Other classic patterns include coin change, longest common subsequence, and edit distance.",
        addtlVideos: [
          {
            label: "The 0/1 Knapsack Problem — Back to Back SWE",
            url: "https://www.youtube.com/embed/xCbYmUPvc2Q",
          },
          {
            label: "Dynamic Programming — 0/1 Knapsack Problem Tutorial",
            url: "https://www.youtube.com/embed/hagBB17_hvg",
          },
        ],
      },
      {
        topicTitle: "System Design Concepts",
        topicDescription:
          "System design interviews test your ability to architect large-scale distributed systems. Key concepts include: Load balancing, which distributes incoming traffic across multiple servers so no single server is overwhelmed—often implemented with reverse proxies. SQL vs. NoSQL trade-offs: relational databases (PostgreSQL, MySQL) offer ACID guarantees and complex joins; NoSQL databases (MongoDB, DynamoDB, Cassandra) provide flexible schemas and easier horizontal scaling. Horizontal scaling (adding more machines) is generally preferred over vertical scaling (adding more resources to one machine) for large-scale systems. Caching (Redis, Memcached, CDNs) stores frequently accessed data in memory to reduce database load. Message queues (Kafka, RabbitMQ) decouple services asynchronously. DB sharding partitions data across machines. HTTP long polling vs. WebSockets addresses real-time communication strategies.",
        addtlVideos: [
          {
            label: "System Design Interview: A Step-By-Step Guide — ByteByteGo",
            url: "https://www.youtube.com/embed/i7twT3x5yv8",
          },
          {
            label:
              "Algorithms You Should Know Before System Design Interviews — ByteByteGo",
            url: "https://www.youtube.com/embed/xbgzl2maQUU",
          },
        ],
      },
      {
        topicTitle: "Operating Systems",
        topicDescription:
          "Operating system fundamentals are frequently tested in backend and systems interviews. A process is a program in execution with its own memory space; a thread is a lighter-weight unit of execution within a process that shares memory with other threads. Concurrency allows multiple threads to make progress, but shared state requires synchronization. Mutexes (mutual exclusion locks) ensure only one thread enters a critical section at a time, preventing data corruption. A deadlock occurs when two or more threads are each waiting for a resource held by the other, creating a circular wait from which neither can proceed—prevented by consistent lock ordering or timeouts. Additional topics include multi-core parallelism, the CPU scheduling evolution, and understanding what resources a process requires (CPU time, memory, I/O, file handles).",
        addtlVideos: [
          {
            label: "Introduction to Threads and Concurrency — IIT Bombay",
            url: "https://www.youtube.com/embed/SVHLonf5AGY",
          },
          {
            label: "Process vs Threads in Operating System — Jenny's Lectures",
            url: "https://www.youtube.com/embed/ITc09gOrqZk",
          },
        ],
      },
      {
        topicTitle: "JavaScript / Language Deep Dive",
        topicDescription:
          "A deep understanding of your primary interview language distinguishes strong candidates. In JavaScript, key concepts include: closures (functions that retain access to their outer scope even after the outer function returns), the prototype chain (how objects inherit properties and methods), and async/await (syntactic sugar over Promises for managing asynchronous operations clearly). Understanding the event loop, call stack, and how JavaScript handles non-blocking I/O is critical for reasoning about concurrency in Node.js. Recommended resources include Eloquent JavaScript and courses by Wes Bos (JavaScript30, ES6) and Techsith for Vanilla JS patterns.",
        addtlVideos: [
          {
            label: "Learn Closures in 13 Minutes — Web Dev Simplified",
            url: "https://www.youtube.com/embed/47SPG8TvUXA",
          },
          {
            label: "JavaScript Closures Tutorial — ColorCode",
            url: "https://www.youtube.com/embed/aHrvi2zTlaU",
          },
        ],
      },
      {
        topicTitle: "CSS",
        topicDescription:
          "CSS knowledge is tested in frontend engineering roles. Flexbox is a one-dimensional layout model that distributes space along a main axis and cross axis, enabling responsive alignment without floats—practice with the Flexbox Froggy game. CSS selectors determine which elements styles apply to; specificity rules determine which rule wins when multiple match—practice with the CSS Diner game. Responsive layout fundamentals include media queries, relative units (rem, em, %), and the mobile-first design approach. Understanding the box model (content, padding, border, margin) and positioning (static, relative, absolute, fixed, sticky) is foundational for layout work.",
        addtlVideos: [
          {
            label: "Flexbox Crash Course 2024 — Traversy Media",
            url: "https://www.youtube.com/embed/3YW65K6LcIA",
          },
          {
            label: "Learn CSS Flexbox in 20 Minutes — Coding2GO",
            url: "https://www.youtube.com/embed/wsTv9y931o8",
          },
        ],
      },
      {
        topicTitle: "Discrete Math",
        topicDescription:
          "An optional stretch topic for candidates with time after completing core phases. Combinatorics covers counting techniques: permutations (ordered arrangements of n items taken r at a time, n!/(n-r)!) and combinations (unordered selections, n choose r). Probability fundamentals include the addition and multiplication rules, conditional probability (P(A|B) = P(A∩B)/P(B)), and Bayes' theorem. Counting problems appear occasionally in algorithm interviews (e.g., counting ways to arrange items, probability of a random array being sorted). Only study this if Phases 1–4 core topics feel solid—it is lower priority.",
        addtlVideos: [
          {
            label: "Permutation Formula — Khan Academy",
            url: "https://www.youtube.com/embed/DROZVHObeko",
          },
          {
            label: "Introduction to Combinations — Khan Academy",
            url: "https://www.youtube.com/embed/iKy-d5_erhI",
          },
        ],
      },
      {
        topicTitle: "Mock Interviews & Polish",
        topicDescription:
          "The final phase converts knowledge into interview performance. Effective technique requires four pillars: (1) Communication—ask clarifying questions before coding, verbalize your thought process as you design your approach; (2) Clean Code—write readable, well-structured solutions; correctness and clarity are both evaluated; (3) Problem Solving—start with a brute-force approach, articulate its complexity, then optimize; compare solutions explicitly by time and space trade-offs; (4) Validation—test your solution with edge cases (null inputs, negative numbers, empty structures, duplicates). Practice on Pramp (free peer mock interviews, aim for 2+ per week) and LeetCode Medium/Hard problems (3–5 per week). Use the Donnemartin System Design repo for design practice.",
        addtlVideos: [
          {
            label: "How to Crack Any System Design Interview — ByteByteGo",
            url: "https://www.youtube.com/embed/o-k7h2G3Gco",
          },
          {
            label: "The Quicksort Sorting Algorithm — Back to Back SWE",
            url: "https://www.youtube.com/embed/uXBnyYuwPe8",
          },
        ],
      },
    ],
  };
  const [currentComplex, setCurrentComplex] = useState(
    "https://www.youtube.com/embed/WRoz58oOO7o?si=hmYVN9jtnhTnVqH-"
  );
//   ------------------------------------------

// --------------------------------------------
  const [sectionId, setSectionId] = useState("723");
  //   secId: vid== 723, practice= 444, progTracker== 111 , leader==000
  return (
    <>
      <div className="contentScreen">
        <div className="contentBtns">
          <img
            src="https://www.freeiconspng.com/thumbs/camera-icon/camera-icon-21.png"
            alt=""
            className="channelBtn"
            onClick={()=>{
                setSectionId('723')
            }}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149646.png"
            alt=""
            className="channelBtn"
            onClick={()=>{
                setSectionId('444')
            }}
          />
          <img
            src="https://png.pngtree.com/png-vector/20230419/ourmid/pngtree-productivity-line-icon-vector-png-image_6714726.png"
            alt=""
            className="channelBtn"
            onClick={()=>{
                setSectionId('111')
            }}
          />
          <img
            src="https://www.freeiconspng.com/uploads/profile-icon-9.png"
            alt=""
            className="channelBtn"
            onClick={()=>{
                setSectionId('000')
            }}
          />
        </div>
        <h2
          style={{ textAlign: "right" }}
          className="sneakTitle fontdiner-swanky-regular"
        >
          Video Study Guide{" "}
        </h2>

        <div className="contentContainer">
          <iframe
            width="100%"
            height="100%"
            src={currentComplex}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          {sectionId}
        </div>
        {/* --------------MEDIA SWITCH---------------- */}
        {/* --------------MEDIA SWITCH---------------- */}
        {/* --------------MEDIA SWITCH---------------- */}
        {/* --------------MEDIA SWITCH---------------- */}
        {/* --------------MEDIA SWITCH---------------- */}

        {/* Button Switch for Topic Navigation */}
        {/* secId: vid== 723, practice= 444, progTracker== 111 , leader==000 */}
        {sectionId === "723" ? (
          <>
            {resourceCenter.resourceTopics.map((srrc) => {
              return (
                <>
                  <div className="openSource">
                    <h3 className="sneqTopic fontdiner-swanky-regular">
                      {srrc.topicTitle}
                    </h3>
                    {srrc.addtlVideos.map((adVid) => {
                      return (
                        <>
                          <div className="linqContainer">
                            <img
                              src="https://www.freeiconspng.com/uploads/video-icon-6.png"
                              alt=""
                              className="vidLinq"
                              onClick={() => {
                                setCurrentComplex(adVid.url);
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </>
        ) : null}

        {sectionId === "444" ? (<>
            <HackerEnvio />
        </>) : null}
        {sectionId === "111" ? (<></>) : null}
        {sectionId === "000" ? (<></>) : null}
      </div>
    </>
  );
}

export default BookShelf;
