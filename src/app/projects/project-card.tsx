'use client';
import path from 'path';
import { Octokit } from '@octokit/rest';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import matter from 'gray-matter';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { containsPrintable, iconNameToFaIcon } from '@/helpers/utils';
import { ProjectMetadata } from '@/types/projects';

const ProjectCard = ({
  project,
}: {
  project: string
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<{
    href: string, metadata: ProjectMetadata, content: string,
  }>();

  useEffect(() => {
    (async () => {
      const href = path.join(pathname, 'project-page') + '?' + createQueryString('projectName', project);
      const res = await fetch(`/projects/${project}.md`);
      if (res.ok) {
        const text = await res.text();
        const parsed = matter(text); // Parse without generics
        const content = parsed.content;
        const metadata = parsed.data as ProjectMetadata;
        setProjectData({ href, metadata, content });
      } else {
        console.error('Error fetching project metadata');
      }
    })();
  }, [createQueryString, project, pathname]);

  if (!projectData) return <Skeleton count={3} />;
  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={clsx(
        `relative block border rounded-lg shadow-lg overflow-hidden
      dark:bg-gray-800
      border-gray-200 dark:border-gray-700`,
      )}
    >
      <motion.button
        layout='position'
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex flex-col w-full px-6 py-3',
          {
            'hover:bg-gray-100 dark:hover:bg-gray-700': projectData.href,
          })}
      >
        <div className='flex w-full justify-between items-center'>
          <h5 className="text-xl font-bold tracking-tight">
            {projectData.metadata.projectName}
          </h5>
          <div className='lg:text-sm flex gap-3'>
            {projectData.metadata.links?.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={'_blank'}
                className='
                  hover:text-black dark:hover:text-white active:scale-90 duration-300
                '
              >
                {/* {link.icon} */}
                <p className=''>
                  <LinkIcon iconName={link.icon} />
                  <span className='hidden lg:inline-block pl-1'>
                    {link.description}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
        <p className="font-normal">
          {projectData.metadata.description}
        </p>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            <motion.div
              layout='position'
              className='dark:bg-gray-900 bg-neutral-200 px-6 py-3'
            >
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, y: 0 },
                  collapsed: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.5 }}
                key={isOpen ? 'open' : 'closed'}
              >
                <ul className='list-disc list-inside'>
                  {projectData.metadata.overview.map((overview, index) => (
                    <li key={index}>
                      {overview}
                    </li>
                  ))}
                </ul>
                {/* <span className=''></span> */}
              </motion.div>
              {containsPrintable(projectData.content) && (
                <div className='flex justify-end'>
                  <Link
                    href={projectData.href}
                    className='
                          block bg-foreground text-background px-1 py-0.5 rounded-md hover:opacity-80
                          active:scale-90 duration-300
                        '
                  >
                    Note
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div >
  );
};

const LinkIcon = ({
  iconName,
}: {
  iconName: string
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType>();
  useEffect(() => {
    (async () => {
      const Icon = await iconNameToFaIcon(iconName);
      setIconComponent(() => Icon);
    })();
  }, [iconName]);
  return (
    <span className='inline-block'>
      {IconComponent ? <IconComponent /> : 'link'}
    </span>
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
          className='text-2xl hover:text-black dark:hover:text-white active:scale-90 duration-300'>
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
