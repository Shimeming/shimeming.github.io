'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { Octokit } from '@octokit/rest';
import { get } from 'http';

const ProjectCard = ({
  content,
}: {
  content: {
    repoUrl: string;
    description: string;
  }
}) => {
  const { repoUrl, description } = content;
  const { owner = 'shimeming', repo = 'error' } = extractRepoUrlInformation(repoUrl) || {};

  const [repoLanguages, setRepoLanguages] = useState<{ languages: { [language: string]: number }, totalCount: number } | undefined>(undefined);
  const [updateTime, setUpdateTime] = useState<Date | undefined>(undefined);

  const getRepoInformation = useCallback(async () => {
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
  }, [owner, repo]);

  const getRepoLanguages = useCallback(async () => {
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
  }, [owner, repo]);

  useEffect(() => {
    getRepoLanguages().then(
      (data) => setRepoLanguages(data),
    );
    getRepoInformation();
  }, [getRepoLanguages, getRepoInformation]);

  return (
    <>
      <div className='block max-w-md p-6 border rounded-lg shadow-lg
      border-gray-200 hover:bg-gray-100
      dark:border-gray-700 dark:hover:bg-gray-700'
      >
        <div className='flex justify-between items-center'>
          <h5 className="text-xl font-bold tracking-tight">
            {repo}
          </h5>
          <a href={repoUrl} target='_blank'
            className='text-2xl'>
            <FaGithub />
          </a>
        </div>
        <p className="font-normal">
          {description}
        </p>
        <hr className='my-2' />
        <div className='my-2'>
          {'Languages: '}
          {repoLanguages
            ? Object.keys(repoLanguages.languages).slice(
              Math.min(4, Object.keys(repoLanguages.languages).length),
            ).map((language) => (
              <a key={language}
                href={`${repoUrl}/search?l=${encodeURIComponent(language)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-slate-400 inline-flex items-center rounded-md px-1 mx-2 text-sm font-medium  ring-1 ring-inset'
              >
                {language}{': '}{Math.trunc((repoLanguages.languages[language] / repoLanguages.totalCount) * 1000) / 10} %
              </a>
            ))
            : repoLanguages === undefined
              ? <Skeleton count={2} />
              : 'No code'
          }
        </div>
        {updateTime
          ? (<p className='opacity-60 text-sm'>{'Updated '}{updateTimeToString(updateTime)}</p>)
          : <Skeleton />
        }
      </div>
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
