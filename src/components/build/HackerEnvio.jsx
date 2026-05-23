import { React, useState } from "react";
import AnswerModal from "./AnswerModal";

function HackerEnvio() {
  const pracQuestions = {
    easy: [
      {
        platform: "HackerRank",
        title: "Solve Me First",
        difficulty: "Easy",
        prompt:
          "Complete the function solveMeFirst to compute the sum of two integers.",
        starterCode: `
      function solveMeFirst(a, b) {
      
      }
            `,
        solution: `
      function solveMeFirst(a, b) {
        return a + b;
      }
            `,
      },
      {
        platform: "HackerRank",
        title: "Simple Array Sum",
        difficulty: "Easy",
        prompt:
          "Given an array of integers, find the sum of all elements in the array.",
        starterCode: `
      function simpleArraySum(arr) {
      
      }
            `,
        solution: `
      function simpleArraySum(arr) {
        return arr.reduce((sum, num) => sum + num, 0);
      }
            `,
      },
      {
        platform: "Replit",
        title: "Reverse a String",
        difficulty: "Easy",
        prompt: "Write a function that takes a string and returns it reversed.",
        starterCode: `
      function reverseString(str) {
      
      }
            `,
        solution: `
      function reverseString(str) {
        return str.split("").reverse().join("");
      }
            `,
      },
    ],

    med: [
      {
        platform: "HackerRank",
        title: "Counting Valleys",
        difficulty: "Medium",
        prompt:
          "Given a sequence of up and down steps, determine the number of valleys walked through.",
        starterCode: `
      function countingValleys(steps, path) {
      
      }
            `,
        solution: `
      function countingValleys(steps, path) {
        let level = 0;
        let valleys = 0;
      
        for (let step of path) {
          if (step === "U") {
            level++;
            if (level === 0) valleys++;
          } else {
            level--;
          }
        }
      
        return valleys;
      }
            `,
      },
      {
        platform: "HackerRank",
        title: "Two Sum",
        difficulty: "Medium",
        prompt:
          "Given an array of integers and a target number, return the indices of two numbers that add up to the target.",
        starterCode: `
      function twoSum(nums, target) {
      
      }
            `,
        solution: `
      function twoSum(nums, target) {
        const map = {};
      
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
      
          if (map[complement] !== undefined) {
            return [map[complement], i];
          }
      
          map[nums[i]] = i;
        }
      
        return [];
      }
            `,
      },
      {
        platform: "Replit",
        title: "Palindrome Checker",
        difficulty: "Medium",
        prompt:
          "Determine whether a string is a palindrome. Ignore spaces and capitalization.",
        starterCode: `
      function isPalindrome(str) {
      
      }
            `,
        solution: `
      function isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/\\s/g, "");
      
        return cleaned === cleaned.split("").reverse().join("");
      }
            `,
      },
    ],

    hard: [
      {
        platform: "HackerRank",
        title: "Merge Intervals",
        difficulty: "Hard",
        prompt: "Given an array of intervals, merge all overlapping intervals.",
        starterCode: `
      function mergeIntervals(intervals) {
      
      }
            `,
        solution: `
      function mergeIntervals(intervals) {
        if (intervals.length <= 1) return intervals;
      
        intervals.sort((a, b) => a[0] - b[0]);
      
        const merged = [intervals[0]];
      
        for (let i = 1; i < intervals.length; i++) {
          const current = intervals[i];
          const last = merged[merged.length - 1];
      
          if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
          } else {
            merged.push(current);
          }
        }
      
        return merged;
      }
            `,
      },
      {
        platform: "HackerRank",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Hard",
        prompt:
          "Find the length of the longest substring without repeating characters.",
        starterCode: `
      function lengthOfLongestSubstring(s) {
      
      }
            `,
        solution: `
      function lengthOfLongestSubstring(s) {
        let set = new Set();
        let left = 0;
        let max = 0;
      
        for (let right = 0; right < s.length; right++) {
          while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
          }
      
          set.add(s[right]);
          max = Math.max(max, right - left + 1);
        }
      
        return max;
      }
            `,
      },
      {
        platform: "Replit",
        title: "Binary Search Tree Validation",
        difficulty: "Hard",
        prompt: "Determine if a binary tree is a valid binary search tree.",
        starterCode: `
      function isValidBST(root) {
      
      }
            `,
        solution: `
      function isValidBST(root, min = -Infinity, max = Infinity) {
        if (!root) return true;
      
        if (root.val <= min || root.val >= max) {
          return false;
        }
      
        return (
          isValidBST(root.left, min, root.val) &&
          isValidBST(root.right, root.val, max)
        );
      }
            `,
      },
    ],
  };
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);
  const sampleCode = `
  function add(a,b){
  return a+b;
  }
  
  console.log(add(2,5));
    `;
  return (
    <>
      <div className="levelTiers">
        <h2 className="fontdiner-swanky-regular">TierOne</h2>
        {pracQuestions.easy.map((problem) => {
          return (
            <>
              <div className="probGod">
                <div className="probStack fontdiner-swanky-regular">
                  <div className="probTitle">{problem.platform}</div>
                  <h2 style={{ color: "navy" }} className="promptProb">
                    {problem.title}
                  </h2>
                  <div className="probDiff">{problem.difficulty}</div>
                </div>

                <p className="probprob">{problem.prompt}</p>

                <textarea className="blackScreen"></textarea>
                <button onClick={() => {
                    setOpen(true)
                    setAnswer(problem.solution)
                }}>Show Answer</button>
                <AnswerModal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  code={answer}
                />
              </div>
            </>
          );
        })}
        <h2 className="fontdiner-swanky-regular">TierTwo</h2>
        {pracQuestions.med.map((problem) => {
          return (
            <>
              <div className="probGod">
                <div className="probStack fontdiner-swanky-regular">
                  <div className="probTitle">{problem.platform}</div>
                  <h2 style={{ color: "navy" }} className="promptProb">
                    {problem.title}
                  </h2>
                  <div className="probDiff">{problem.difficulty}</div>
                </div>

                <p className="probprob">{problem.prompt}</p>

                <textarea className="blackScreen"></textarea>
                <button onClick={() => {
                    setOpen(true)
                    setAnswer(problem.solution)
                }}>Show Answer</button>
                <AnswerModal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  code={answer}
                />
              </div>
            </>
          );
        })}
        <h2 className="fontdiner-swanky-regular">TierThree</h2>
        {pracQuestions.hard.map((problem) => {
          return (
            <>
              <div className="probGod">
                <div className="probStack fontdiner-swanky-regular">
                  <div className="probTitle">{problem.platform}</div>
                  <h2 style={{ color: "navy" }} className="promptProb">
                    {problem.title}
                  </h2>
                  <div className="probDiff">{problem.difficulty}</div>
                </div>

                <p className="probprob">{problem.prompt}</p>

                <textarea className="blackScreen"></textarea>
                <button onClick={() => {
                    setOpen(true)
                    setAnswer(problem.solution)
                }}>Show Answer</button>
                <AnswerModal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  code={answer}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default HackerEnvio;
