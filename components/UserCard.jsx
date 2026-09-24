import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600">{user.email}</p>

        <p className="mt-1 text-sm text-gray-500">{user.company.name}</p>

        <Button className="mt-4">View Profile</Button>
      </CardContent>
    </Card>
  );
}
