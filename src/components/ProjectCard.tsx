'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { Octokit } from '@octokit/rest';

const ProjectCard = ({
  content,
}: {
  content: {
    repoUrl: string;
    description: string;
  }
}) => {
  const { repoUrl, description } = content;
  const { repoName = 'error' } = extractRepoUrlInformation(repoUrl) || {};

  const [repoLanguages, setRepoLanguages] = useState<{ languages: { [language: string]: number }, totalCount: number } | undefined>(undefined);

  const getRepoLanguages = useCallback(async () => {
    const languageUrl = convertToLanguagesUrl(repoUrl);
    if (languageUrl === undefined) return { languages: {}, totalCount: 0 };
    ;
    try {
      const response = await axios.get<{ [language: string]: number }>(languageUrl);
      return { languages: response.data, totalCount: Object.values(response.data).reduce((a, b) => a + b, 0) };
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error('An unknown error occurred');
    }
  }, [repoUrl]);

  useEffect(() => {
    getRepoLanguages().then(
      (data) => setRepoLanguages(data),
    );
  }, [getRepoLanguages]);

  return (
    <>
      <div className='block max-w-md p-6 border rounded-lg shadow-lg
      border-gray-200 hover:bg-gray-100
      dark:border-gray-700 dark:hover:bg-gray-700'
      >
        <div className='flex justify-between items-center'>
          <h5 className="text-xl font-bold tracking-tight">
            {repoName}
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
            ? Object.keys(repoLanguages.languages).map((language) => (
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
        <p className='opacity-60 text-sm'>Updated</p>
      </div>
    </>
  );
};

const extractRepoUrlInformation = (repoUrl: string) => {
  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
  const match = repoUrl.match(regex);
  if (match) {
    return { owner: match[1], repoName: match[2] };
  }
};

const convertToLanguagesUrl = (repoUrl: string) => {
  const information = extractRepoUrlInformation(repoUrl);
  if (information) {
    const { owner, repoName: repo } = information;
    return `https://api.github.com/repos/${owner}/${repo}/languages`;
  } else {
    console.error('Invalid GitHub URL: ' + repoUrl);
  }
};

const updateTimeToString = (updateTime: Date) => {
  const now = new Date();
  const diff = now.getTime() - updateTime.getTime();
  if (diff <= 1000*60) return 'just now';
  const hours = Math.trunc(diff / 1000 / 60 / 60);
  if (hours < 24) {
    if (hours < 1) return 'within an hour';
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `on ${updateTime.toLocaleDateString()}`;
  }
};

export default ProjectCard;
