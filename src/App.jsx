import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/general/Nav";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Bookmark from "./pages/Bookmark";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
import Contractor from "./components/build/Contractor";
import TestimonialsQueue from "./components/build/TestimonialsStack";
import RippableFlyerCarousel from "./components/teach/RippableFlyerCarousel";
import { ArticleBubble } from "./components/build/ArticleBubble";
function App() {
  const articleData = [
    {
      image: "/images/article1.jpg",
      alt: "Stale code intelligence article",
      title: "QCon London 2026: Refreshing Stale Code Intelligence",
      content: (
        <div>
          <p>
            InfoQ coverage on how AI coding models drift from real-world repositories and why repository-specific knowledge matters.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/stale-code-intelligence/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Humans in AI-assisted software development article",
      title: "Where Do Humans Fit in AI-Assisted Software Development?",
      content: (
        <div>
          <p>
            InfoQ summary of Martin Fowler blog ideas on how developers may move from coding everything to guiding AI systems.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/mf-aiassisted-dev/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Harness engineering article",
      title: "OpenAI Introduces Harness Engineering: Codex Agents Power Large-Scale Software Development",
      content: (
        <div>
          <p>
            InfoQ article on OpenAI’s harness engineering approach for using agents across the software lifecycle.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/openai-harness-engineering-codex/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "Ethical AI engineering article",
      title: "QCon London 2026: Ethical AI is an Engineering Problem",
      content: (
        <div>
          <p>
            InfoQ piece focused on safety, reliability, and ethics as core engineering requirements for production AI.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/ethical-ai-problem/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "AI coding bottleneck article",
      title: "AI Coding Assistants Haven’t Sped up Delivery Because Coding Was Never the Bottleneck",
      content: (
        <div>
          <p>
            InfoQ coverage of why faster code generation does not automatically mean faster software delivery.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/agoda-ai-code-bottleneck/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Anthropic AI coding study article",
      title: "Anthropic Study: AI Coding Assistance Reduces Developer Skill Formation",
      content: (
        <div>
          <p>
            InfoQ writeup on research examining tradeoffs between AI assistance, comprehension, and developer learning.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/ai-coding-skill-formation/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Team topologies and AI article",
      title: "QCon London 2026: Team Topologies as the 'Infrastructure' for AI Agency",
      content: (
        <div>
          <p>
            InfoQ article on organizational readiness, bounded agency, and team structure for AI systems.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/ai-agency-team-topologies/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "AI and agile manifesto article",
      title: "Does AI Make the Agile Manifesto Obsolete?",
      content: (
        <div>
          <p>
            InfoQ discussion around whether agentic software development changes the assumptions behind agile.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Google multi-agent scaling principles article",
      title: "Google Explores Scaling Principles for Multi-Agent Systems",
      content: (
        <div>
          <p>
            InfoQ report on Google Research experiments around when multi-agent coordination helps or hurts.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/google-agent-scaling-principles/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "Teleport AI security article",
      title: "Teleport Report Finds Over-Privileged AI Systems Linked to Fourfold Rise in Security Incidents",
      content: (
        <div>
          <p>
            InfoQ article on AI-system privileges, access control, and security risk growth in enterprise environments.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/teleport-ai-report/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "Google developer knowledge API article",
      title: "Google Brings its Developer Documentation into the Age of AI Agents",
      content: (
        <div>
          <p>
            InfoQ coverage of Google’s Developer Knowledge API and MCP support for agent-friendly documentation.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/google-documentation-ai-agents/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Booking AI evolution article",
      title: "QCon London 2026: Behind Booking.com's AI Evolution",
      content: (
        <div>
          <p>
            InfoQ piece on Booking.com’s layers of data management, ML engineering, and domain intelligence.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/booking-evolution-ai-manuel/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Reliable retrieval article",
      title: "QCon London 2026: Reliable Retrieval for Production AI Systems",
      content: (
        <div>
          <p>
            InfoQ article on RAG reliability and why indexing and retrieval often matter more than the model.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/retrieval-production-ai/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Microsoft agent framework article",
      title: "Microsoft Agent Framework RC Simplifies Building Production-Ready Agents",
      content: (
        <div>
          <p>
            InfoQ coverage of Microsoft Agent Framework reaching release candidate status for .NET and Python.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/ms-agent-framework-rc/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Next billion developers article",
      title: "QCon London 2026: Tools That Enable the Next 1B Developers",
      content: (
        <div>
          <p>
            InfoQ report on building tools and frameworks that serve both human developers and AI agents.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/qcon-next-developers/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "Rate limiting systems article",
      title: "Uber and OpenAI Retool Rate Limiting Systems",
      content: (
        <div>
          <p>
            InfoQ article on adaptive, infrastructure-level rate limiting for large-scale AI and software systems.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/uber-openai-rate-limiting/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "GitHub agentic workflows article",
      title: "GitHub Agentic Workflows Unleash AI-Driven Repository Automation",
      content: (
        <div>
          <p>
            InfoQ coverage of GitHub’s agentic workflows for repository tasks like triage, docs, and CI troubleshooting.
          </p>
          <a
            href="https://www.infoq.com/news/2026/02/github-agentic-workflows/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Shielding the core resilience article",
      title: "QCon London 2026: Shielding the Core: Architecting Resilience with Multi-Layer Defenses",
      content: (
        <div>
          <p>
            InfoQ article on designing resilient systems that can absorb spikes and protect critical services.
          </p>
          <a
            href="https://www.infoq.com/news/2026/03/shielding-the-core-parra/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "AGENTS.md article",
      title: "AGENTS.md Emerges as Open Standard for AI Coding Assistants",
      content: (
        <div>
          <p>
            InfoQ coverage of AGENTS.md as a machine-readable companion to README files for coding agents.
          </p>
          <a
            href="https://www.infoq.com/news/2025/08/agents-md/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Growing as software engineer with AI article",
      title: "Growing Yourself as a Software Engineer, Using AI to Develop Software",
      content: (
        <div>
          <p>
            InfoQ interview on showcasing engineering work and using AI responsibly in software development.
          </p>
          <a
            href="https://www.infoq.com/news/2025/12/develop-software-AI/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Replit Agent 3 article",
      title: "Replit Introduces Agent 3 for Extended Autonomous Programming",
      content: (
        <div>
          <p>
            InfoQ article on Replit’s autonomous agent for longer-running programming and workflow tasks.
          </p>
          <a
            href="https://www.infoq.com/news/2025/09/replit-agent-3/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "AI coding tools underperform study article",
      title: "AI Coding Tools Underperform in Field Study with Experienced Open-Source Developers",
      content: (
        <div>
          <p>
            InfoQ summary of METR research showing AI tools can slow experienced developers on real tasks.
          </p>
          <a
            href="https://www.infoq.com/news/2025/07/ai-productivity/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "Agent sandbox Kubernetes article",
      title: "Open-Source Agent Sandbox Enables Secure Deployment of Stateful AI Workloads on Kubernetes",
      content: (
        <div>
          <p>
            InfoQ coverage of a Kubernetes controller for isolating and managing agent execution environments.
          </p>
          <a
            href="https://www.infoq.com/news/2025/12/agent-sandbox-kubernetes/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Toad CLI article",
      title: "Toad: a Unified CLI Tool for All Your LLMs That Promises Beautiful Agent Workflows",
      content: (
        <div>
          <p>
            InfoQ article on a unified terminal interface for multiple coding agents and LLM workflows.
          </p>
          <a
            href="https://www.infoq.com/news/2025/12/llm-agent-cli/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Neptune platform engineering article",
      title: "Neptune Combines AI-Assisted Infrastructure as Code and Platform Engineering",
      content: (
        <div>
          <p>
            InfoQ coverage of Neptune as a conversational AI platform engineer across major clouds.
          </p>
          <a
            href="https://www.infoq.com/news/2025/12/neptune-ai-platform-engineer/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Google ADK for Go article",
      title: "Google Launches Agent Development Kit for Go",
      content: (
        <div>
          <p>
            InfoQ piece on Google extending its Agent Development Kit to Go developers.
          </p>
          <a
            href="https://www.infoq.com/news/2025/11/go-agent-development-kit/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Container Use article",
      title: "Container Use: a New Tool for Isolated, Parallel Coding Agents",
      content: (
        <div>
          <p>
            InfoQ coverage of containerized sandboxes and git worktrees for running multiple coding agents safely.
          </p>
          <a
            href="https://www.infoq.com/news/2025/08/container-use/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "OpenAI Codex software engineering agent article",
      title: "OpenAI Launches Codex Software Engineering Agent",
      content: (
        <div>
          <p>
            InfoQ article on OpenAI’s Codex research preview for writing, debugging, testing, and pull requests.
          </p>
          <a
            href="https://www.infoq.com/news/2025/05/openai-codex/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
  
    {
      image: "/images/article5.jpg",
      alt: "AI and platform engineering article",
      title: "In 2026, AI Is Merging With Platform Engineering. Are You Ready?",
      content: (
        <div>
          <p>
            The New Stack article on how platform engineering and AI workflows are increasingly converging.
          </p>
          <a
            href="https://thenewstack.io/in-2026-ai-is-merging-with-platform-engineering-are-you-ready/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "AI cloud taxonomy article",
      title: "A practical guide to the 6 categories of AI cloud infrastructure in 2026",
      content: (
        <div>
          <p>
            The New Stack breakdown of AI cloud categories and how teams can match workloads to infrastructure.
          </p>
          <a
            href="https://thenewstack.io/ai-cloud-taxonomy-2026/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Kelsey Hightower AI article",
      title: "Kelsey Hightower at KubeCon 2026: 'Everyone is a junior engineer now'",
      content: (
        <div>
          <p>
            The New Stack coverage of Hightower’s views on AI, open source, and career resilience.
          </p>
          <a
            href="https://thenewstack.io/hightower-ai-open-source-kubecon/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Context bottleneck article",
      title: "Context is AI coding's real bottleneck in 2026",
      content: (
        <div>
          <p>
            The New Stack article arguing that context quality drives actual productivity gains from AI coding.
          </p>
          <a
            href="https://thenewstack.io/context-is-ai-codings-real-bottleneck-in-2026/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Jellyfish AI development study article",
      title: "Jellyfish AI development study: The real sting has yet to land",
      content: (
        <div>
          <p>
            The New Stack review of AI engineering trends and the risks around autonomous development agents.
          </p>
          <a
            href="https://thenewstack.io/jellyfish-ai-engineering-trends/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "AI infrastructure code article",
      title: "AI can write your infrastructure code. There's a reason most enterprises won't let it deploy",
      content: (
        <div>
          <p>
            The New Stack article on guardrails, risk, and why infra code needs stricter controls than app code.
          </p>
          <a
            href="https://thenewstack.io/spacelift-ai-infrastructure-code/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "AI agent validation bottleneck article",
      title: "Enterprise dev teams are about to hit a wall. And CI is the problem",
      content: (
        <div>
          <p>
            The New Stack article on AI agents increasing code output faster than validation systems can keep up.
          </p>
          <a
            href="https://thenewstack.io/ai-agent-validation-bottleneck/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Tech predictions article",
      title: "5 Tech Predictions for 2026: From AI Inference to Kubernetes",
      content: (
        <div>
          <p>
            The New Stack outlook on major software and infrastructure themes for 2026.
          </p>
          <a
            href="https://thenewstack.io/5-tech-predictions-for-2026-from-ai-inference-to-kubernetes/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Data in 2026 article",
      title: "Data in 2026: Interchangeable Models, Clouds, and Specialization",
      content: (
        <div>
          <p>
            The New Stack article on model choice, cloud portability, and specialization in modern AI systems.
          </p>
          <a
            href="https://thenewstack.io/data-in-2026-interchangeable-models-clouds-and-specialization/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "AI laws article",
      title: "A Field Guide to 2026 Federal, State and EU AI Laws",
      content: (
        <div>
          <p>
            The New Stack guide to AI regulation and what engineering teams need to document and prepare.
          </p>
          <a
            href="https://thenewstack.io/a-field-guide-to-2026-federal-state-and-eu-ai-laws/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "AI engineering trends 2025 article",
      title: "AI Engineering Trends in 2025: Agents, MCP and Vibe Coding",
      content: (
        <div>
          <p>
            The New Stack roundup of developer-facing AI trends including agents, MCP, and vibe coding.
          </p>
          <a
            href="https://thenewstack.io/ai-engineering-trends-in-2025-agents-mcp-and-vibe-coding/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "Agentic CLI era article",
      title: "AI Coding Tools in 2025: Welcome to the Agentic CLI Era",
      content: (
        <div>
          <p>
            The New Stack article on the shift from IDE helpers to terminal-based agentic coding workflows.
          </p>
          <a
            href="https://thenewstack.io/ai-coding-tools-in-2025-welcome-to-the-agentic-cli-era/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "Developers moving target article",
      title: "Developers are coding to a moving target, and nobody's really ready",
      content: (
        <div>
          <p>
            The New Stack piece on how fast-moving AI change is reshaping software practice faster than teams can adapt.
          </p>
          <a
            href="https://thenewstack.io/developers-coding-moving-target-ai/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "56 faster 19 slower article",
      title: "How AI coding makes developers 56% faster and 19% slower",
      content: (
        <div>
          <p>
            The New Stack article comparing conflicting productivity studies around AI-assisted coding.
          </p>
          <a
            href="https://thenewstack.io/how-ai-coding-makes-developers-56-faster-and-19-slower/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Future of programming languages article",
      title: "Will AI force code to evolve or make it extinct?",
      content: (
        <div>
          <p>
            The New Stack article on how AI may reshape programming languages and software design choices.
          </p>
          <a
            href="https://thenewstack.io/ai-programming-languages-future/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "DeveloperWeek AI software engineering article",
      title: "How AI Is Reshaping Software Engineering: Key Takeaways From DeveloperWeek 2025",
      content: (
        <div>
          <p>
            The New Stack summary of how AI coding assistants and workflows are changing engineering teams.
          </p>
          <a
            href="https://thenewstack.io/how-ai-is-reshaping-software-engineering-key-takeaways-from-developerweek-2025/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "From vibes to engineering article",
      title: "From vibes to engineering: How AI agents outgrew their prototype phase",
      content: (
        <div>
          <p>
            The New Stack article on the move from vibe coding demos toward more disciplined engineering.
          </p>
          <a
            href="https://thenewstack.io/vibe-coding-agentic-engineering/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "WebAssembly sandboxing AI agents article",
      title: "WebAssembly could solve AI agents' most dangerous problem",
      content: (
        <div>
          <p>
            The New Stack piece on sandboxing agent-generated code with WebAssembly for stronger isolation.
          </p>
          <a
            href="https://thenewstack.io/webassembly-sandboxing-ai-agents/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "AI coding skills security audit article",
      title: "What a security audit of 22511 AI coding skills found",
      content: (
        <div>
          <p>
            The New Stack article on a large audit of AI agent skills and the security gaps it revealed.
          </p>
          <a
            href="https://thenewstack.io/ai-agent-skills-security/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Web development 2025 article",
      title: "Web Development in 2025: AI's React Bias vs. Native Web",
      content: (
        <div>
          <p>
            The New Stack article on how AI coding tools tend to favor React over native web approaches.
          </p>
          <a
            href="https://thenewstack.io/web-development-in-2025-ais-react-bias-vs-native-web/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "AI coding trends developer tools article",
      title: "AI Coding Trends: Developer Tools To Watch in 2025",
      content: (
        <div>
          <p>
            The New Stack overview of AI-powered coding tools across IDEs, agents, and cloud-native workflows.
          </p>
          <a
            href="https://thenewstack.io/ai-powered-coding-developer-tool-trends-to-monitor-in-2025/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Frontend AI shift article",
      title: "2025's Radical Frontend AI Shift",
      content: (
        <div>
          <p>
            The New Stack article on how frontend development changed as AI became part of the user experience.
          </p>
          <a
            href="https://thenewstack.io/2025s-radical-frontend-ai-shift/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
  
    {
      image: "/images/article3.jpg",
      alt: "Qodo code verification article",
      title: "Qodo raises $70M for code verification as AI coding scales",
      content: (
        <div>
          <p>
            TechCrunch article on code verification becoming a bigger challenge as AI code generation grows.
          </p>
          <a
            href="https://techcrunch.com/2026/03/30/qodo-bets-on-code-verification-as-ai-coding-scales-raises-70m/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "Anthropic Claude Code auto mode article",
      title: "Anthropic hands Claude Code more control, but keeps it on a leash",
      content: (
        <div>
          <p>
            TechCrunch coverage of Claude Code auto mode and the balance between autonomy and safeguards.
          </p>
          <a
            href="https://techcrunch.com/2026/03/24/anthropic-hands-claude-code-more-control-but-keeps-it-on-a-leash/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "Spotify AI developers article",
      title: "Spotify says its best developers haven't written a line of code since December, thanks to AI",
      content: (
        <div>
          <p>
            TechCrunch report on Spotify’s internal AI-assisted engineering workflows and developer velocity claims.
          </p>
          <a
            href="https://techcrunch.com/2026/02/12/spotify-says-its-best-developers-havent-written-a-line-of-code-since-december-thanks-to-ai/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "OpenClaw playful AI builders article",
      title: "OpenClaw creator's advice to AI builders is to be more playful and allow yourself time to improve",
      content: (
        <div>
          <p>
            TechCrunch interview with the OpenClaw creator on learning and experimentation in AI building.
          </p>
          <a
            href="https://techcrunch.com/2026/02/25/openclaw-creators-advice-to-ai-builders-is-to-be-more-playful-and-allow-yourself-time-to-improve/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "Cursor coding model article",
      title: "Cursor admits its new coding model was built on top of Moonshot AI’s Kimi",
      content: (
        <div>
          <p>
            TechCrunch article on Cursor’s model strategy and the competition among AI coding tools.
          </p>
          <a
            href="https://techcrunch.com/2026/03/22/cursor-admits-its-new-coding-model-was-built-on-top-of-moonshot-ais-kimi/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article2.jpg",
      alt: "Memory game AI models article",
      title: "Running AI models is turning into a memory game",
      content: (
        <div>
          <p>
            TechCrunch piece on the growing importance of memory constraints in running AI models.
          </p>
          <a
            href="https://techcrunch.com/2026/02/17/running-ai-models-is-turning-into-a-memory-game/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article3.jpg",
      alt: "Anthropic code review tool article",
      title: "Anthropic launches code review tool to check flood of AI-generated code",
      content: (
        <div>
          <p>
            TechCrunch coverage of Anthropic’s AI code review system for pull requests and logic errors.
          </p>
          <a
            href="https://techcrunch.com/2026/03/09/anthropic-launches-code-review-tool-to-check-flood-of-ai-generated-code/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article4.jpg",
      alt: "Reload shared memory agents article",
      title: "Reload wants to give your AI agents a shared memory",
      content: (
        <div>
          <p>
            TechCrunch article on persistent shared memory for coding agents working on the same project.
          </p>
          <a
            href="https://techcrunch.com/2026/02/19/reload-an-ai-employee-agent-management-platform-raises-2-275m-and-launches-an-ai-employee/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article5.jpg",
      alt: "AI skills gap article",
      title: "The AI skills gap is here, says AI company, and power users are pulling ahead",
      content: (
        <div>
          <p>
            TechCrunch report on uneven AI adoption and how experienced users are gaining more advantage.
          </p>
          <a
            href="https://techcrunch.com/2026/03/25/the-ai-skills-gap-is-here-says-ai-company-and-power-users-are-pulling-ahead/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article6.jpg",
      alt: "Cursor agentic coding system article",
      title: "Cursor is rolling out a new kind of agentic coding tool",
      content: (
        <div>
          <p>
            TechCrunch article on Cursor Automations and how it launches coding agents based on triggers.
          </p>
          <a
            href="https://techcrunch.com/2026/03/05/cursor-is-rolling-out-a-new-system-for-agentic-coding/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    },
    {
      image: "/images/article1.jpg",
      alt: "OpenAI macOS app for Codex article",
      title: "OpenAI launches new macOS app for agentic coding",
      content: (
        <div>
          <p>
            TechCrunch coverage of OpenAI bringing Codex agentic coding workflows into a macOS app.
          </p>
          <a
            href="https://techcrunch.com/2026/02/02/openai-launches-new-macos-app-for-agentic-coding/"
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>
      ),
    }
  ];
  return (
    <>
      {/* Nav */}
      <Nav />
      {/* Dashboard */}
      <div className="organicSplit">
        <div className="ogRight">
          <img src="images/jclLogoMajor.png" alt="" className="lionShare" />
          <div className="lionShareTopic fontdiner-swanky-regular">Reviews</div>
          <p className="revOne">
            JVLIVN is in the early stages of building its reputation, with a
            strong focus on delivering real value through practical tech
            education, digital solutions, and hands-on support. As the brand
            continues to grow, its approach centers on clarity, real-world
            application, and measurable outcomes rather than hype.{" "}
          </p>
          <TestimonialsQueue />
          <p className="revOne">
            Future reviews and testimonials will reflect the experiences of
            individuals and organizations who engage with JVLIVN’s services,
            highlighting the impact of its training, development work, and
            consulting. The goal is to earn trust through consistent delivery,
            allowing authentic feedback to naturally shape the brand’s
            credibility over time.
          </p>
          <img src="images/jclLogoMajor.png" alt="" className="lionShare" />
          <div className="lionShareTopic fontdiner-swanky-regular">
            Partnership
          </div>
        </div>
        <div className="ogMid">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/teach" element={<Learn />} />
            <Route path="/about" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
        <div className="ogLeft">
          <img src="images/jclLogoMajor.png" alt="" className="lionShare" />
          <div className="lionShareTopic fontdiner-swanky-regular">Events</div>
          <RippableFlyerCarousel />
          <img src="images/jclLogoMajor.png" alt="" className="lionShare" />
          <div className="lionShareTopic fontdiner-swanky-regular">
            Articles
          </div>
          <div className="articleMajor">

          {articleData.map((item, index) => {
            return(
            <div>
              <ArticleBubble
                key={index}
                image={"https://png.pngtree.com/png-vector/20230307/ourmid/pngtree-article-vector-icon-design-illustration-png-image_6637011.png"}
                alt={item.alt}
                title={item.title}
                content={item.content}
              />
            </div>
            )
          })}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default App;
