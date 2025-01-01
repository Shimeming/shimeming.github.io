'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Octokit } from '@octokit/rest';
import Link from 'next/link';
import { GithubProjectMetadata, ProjectMetadata } from '@/types/projects';
import matter from 'gray-matter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ProjectCard = ({
  project,
}: {
  project: string
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  const [projectMetadata, setProjectMetadata] = useState<{
    href: string, data: ProjectMetadata
  }>();

  useEffect(() => {
    (async () => {
      // const href = `/projects/${project}`;
      const href = pathname + '?' + createQueryString('projectName', project);
      const res = await fetch(`/projects/${project}.md`);
      if (res.ok) {
        const text = await res.text();
        const data = matter(text).data as unknown as ProjectMetadata;
        setProjectMetadata({ href, data });
      } else {
        console.error('Error fetching project metadata');
      }
    })();
  }, [project]);

  if (!projectMetadata) return <Skeleton count={3} />;
  return (
    <div className='relative block p-6 border rounded-lg shadow-lg
      border-gray-200 hover:bg-gray-100
      dark:border-gray-700 dark:hover:bg-gray-700'
    >
      <Link href={projectMetadata.href}
        className='absolute inset-0'
      />
      <div className='[&_*]:z-10'>
        {(projectMetadata.data as GithubProjectMetadata).repoUrl !== undefined
          ? <GithubProjectCard content={projectMetadata.data as GithubProjectMetadata} />
          : <div>{projectMetadata.data.projectName}</div>
        }
      </div>
    </div>
  );
};

const GithubProjectCard = ({
  content,
  enableFetchInformation = false,
}: {
  content: {
    projectName: string;
    repoUrl: string;
    description: string;
  };
  enableFetchInformation?: boolean;
}) => {
  const { projectName, repoUrl, description } = content;
  const { owner = 'shimeming', repo = 'error' } = extractRepoUrlInformation(repoUrl) || {};

  const [repoLanguages, setRepoLanguages] = useState<{ languages: { [language: string]: number }, totalCount: number } | undefined>(undefined);
  const [updateTime, setUpdateTime] = useState<Date | undefined>(undefined);

  const getRepoInformation = useCallback(async () => {
    if (!enableFetchInformation) return;
    const octokit = new Octokit();
    try {
      // Fetch the branch details to get the latest commit SHA
      const repoInfo = await octokit.repos.get({
        owner,
        repo,
      });
      console.log(repoInfo);
      const defaultBranch = repoInfo.data.default_branch;
      const branchInfo = await octokit.repos.getBranch({
        owner,
        repo,
        branch: defaultBranch,
      });
      const commitSha = branchInfo.data.commit.sha;
      const commitDetails = await octokit.repos.getCommit({
        owner,
        repo,
        ref: commitSha,
      });
      const commitDateString = commitDetails.data.commit.committer?.date;
      const commitDate = commitDateString ? new Date(commitDateString) : undefined;
      setUpdateTime(commitDate);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error('An unknown error occurred');
    }
  }, [owner, repo, enableFetchInformation]);

  const getRepoLanguages = useCallback(async () => {
    if (!enableFetchInformation) return;
    const octokit = new Octokit();
    try {
      const response = (await octokit.repos.listLanguages({
        owner,
        repo,
      }));
      return { languages: response.data, totalCount: Object.values(response.data).reduce((a, b) => a + b, 0) };
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error('An unknown error occurred');
    }
  }, [owner, repo, enableFetchInformation]);

  useEffect(() => {
    getRepoLanguages().then(
      (data) => setRepoLanguages(data),
    );
    getRepoInformation();
  }, [getRepoLanguages, getRepoInformation]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <h5 className="text-xl font-bold tracking-tight">
          {projectName}
        </h5>
        <a href={repoUrl} target='_blank'
          className='text-2xl hover:text-black dark:hover:text-white active:scale-90'>
          <FaGithub />
        </a>
      </div>
      <p className="font-normal">
        {description}
      </p>
      {enableFetchInformation && <>
        <hr className='my-2' />
        <div className='my-2 text-sm'>
          {'Languages: '}
          {repoLanguages
            ? Object.keys(repoLanguages.languages).slice(
              0, Math.min(4, Object.keys(repoLanguages.languages).length),
            ).map((language) => (
              <span key={language}
                className='bg-slate-400 inline-flex items-center rounded-md px-1 mx-2 font-medium ring-1 ring-inset'
              >
                <a key={language}
                  href={`${repoUrl}/search?l=${encodeURIComponent(language)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {language}{': '}{Math.trunc((repoLanguages.languages[language] / repoLanguages.totalCount) * 1000) / 10} %
                </a>
              </span>
            ))
            : repoLanguages === undefined
              ? <Skeleton count={2} />
              : 'No code'
          }
        </div>
        {updateTime
          ? (<p className='opacity-60'>{'Updated '}{updateTimeToString(updateTime)}</p>)
          : <Skeleton className='text-sm' />
        } </>}
    </>
  );
};

const extractRepoUrlInformation = (repoUrl: string) => {
  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
  const match = repoUrl.match(regex);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
};

const updateTimeToString = (updateTime?: Date) => {
  if (!updateTime) return 'unknown';
  const now = new Date();
  const diff = now.getTime() - updateTime.getTime();
  if (diff <= 1000 * 60) return 'just now';
  const hours = Math.trunc(diff / 1000 / 60 / 60);
  if (hours < 24) {
    if (hours < 1) return 'within an hour';
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `on ${updateTime.toLocaleDateString()}`;
  }
};

export default ProjectCard;
