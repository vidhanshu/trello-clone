import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { HelpCircle, User2 } from 'lucide-react';

import Hint from './hint';
import db from '@/lib/db';
import FormPopover from '@/components/form/form-popover';
import { Skeleton } from '@/components/ui/skeleton';

export default async function BoardList() {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="w-4 h-4 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="relative group aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm md:h-[100px] md:w-[180px] p-2 overflow-hidden"
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <>
            <div
              role="button"
              className="aspect-video relative md:h-[100px] md:w-[180px] bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            >
              <p className="text-sm">Create new Board</p>
              <span className="text-xs">5 remaining</span>
              <Hint
                sideOffset={40}
                description="Free workspaces can have upto 5 open boards, for unlimted boards upgrade this workspace to a premium plan."
              >
                <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
              </Hint>
            </div>
          </>
        </FormPopover>
      </div>
    </div>
  );
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
      <Skeleton className="aspect-video md:h-[100px] md:w-[180px] p-2" />
    </div>
  );
};
