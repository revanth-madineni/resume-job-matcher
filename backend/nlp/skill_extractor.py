import re

KNOWN_SKILLS = {
    # Languages
    "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#", "Go", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Bash", "Shell",
    # Web
    "React", "Vue", "Angular", "Next.js", "Nuxt.js", "HTML", "CSS", "Tailwind CSS",
    "Bootstrap", "SASS", "GraphQL", "REST APIs", "REST", "gRPC", "WebSockets",
    # Backend / Frameworks
    "FastAPI", "Flask", "Django", "Express", "Node.js", "Spring Boot", "Rails",
    "Laravel", "ASP.NET", "Fastify",
    # Databases
    "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Elasticsearch",
    "DynamoDB", "Cassandra", "Firebase", "Supabase",
    # Cloud / DevOps
    "AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible",
    "Jenkins", "GitHub Actions", "CircleCI", "Helm", "ArgoCD",
    "AWS Lambda", "EC2", "S3", "ECS", "EKS", "CloudFormation",
    # AI / ML
    "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Keras",
    "Hugging Face", "OpenAI", "LangChain", "spaCy", "NLTK", "XGBoost",
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
    # Tools
    "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence",
    "Linux", "Unix", "Nginx", "Apache", "Kafka", "RabbitMQ",
    "Prometheus", "Grafana", "Datadog", "Splunk",
    # Practices
    "CI/CD", "DevOps", "Agile", "Scrum", "Microservices", "Infrastructure as Code",
    "TDD", "BDD", "Pair Programming", "Code Review",
}

_pattern = re.compile(
    r"\b(" + "|".join(re.escape(s) for s in sorted(KNOWN_SKILLS, key=len, reverse=True)) + r")\b",
    re.IGNORECASE,
)


def extract_skills(text: str) -> list[str]:
    matches = _pattern.findall(text)
    # Normalise casing to canonical form
    canonical = {s.lower(): s for s in KNOWN_SKILLS}
    seen: set[str] = set()
    result: list[str] = []
    for m in matches:
        key = m.lower()
        skill = canonical.get(key, m)
        if skill not in seen:
            seen.add(skill)
            result.append(skill)
    return result
