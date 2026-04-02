import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Users, Calendar, CheckCircle2, Clock, XCircle, Eye, Mail, Download, Plus, Edit2, Trash2 } from 'lucide-react';

const ADMIN_EMAIL = 'dk.vidikovac@gmail.com';
const ADMIN_PASSWORD = 'kanjodesign2026';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    naslov: '',
    kratak_opis: '',
    sadrzaj: '',
    datum: new Date().toISOString().split('T')[0],
    slika_url: '',
    status: 'objavljeno'
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
      if (rememberMe) {
        localStorage.setItem('adminAuth', 'true');
      }
    } else {
      setError('Pogrešan email ili šifra');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['kitchenRequests'],
    queryFn: async () => {
      const data = await base44.entities.KitchenRequest.list('-created_date', 100);
      return data;
    },
    enabled: authenticated,
  });

  const { data: newsletters = [], isLoading: newslettersLoading } = useQuery({
    queryKey: ['newsletters'],
    queryFn: async () => {
      const data = await base44.entities.NewsletterSubscription.list('-created_date', 100);
      return data;
    },
    enabled: authenticated,
  });

  const { data: blogPosts = [], isLoading: blogsLoading, refetch: refetchBlogs } = useQuery({
    queryKey: ['blogPostsAdmin'],
    queryFn: async () => {
      const data = await base44.entities.BlogPost.list('-datum', 100);
      return data;
    },
    enabled: authenticated,
  });

  const updateStatus = async (id, newStatus) => {
    try {
      await base44.entities.KitchenRequest.update(id, { status: newStatus });
      refetch();
    } catch (error) {
      console.error('Greška pri ažuriranju statusa:', error);
    }
  };

  const handleExportNewsletters = () => {
    const csvContent = [
      ['Ime', 'Prezime', 'Email', 'Status', 'Datum prijave'].join(','),
      ...newsletters.map(n => [
        n.ime,
        n.prezime,
        n.email,
        n.status,
        new Date(n.created_date).toLocaleDateString('sr-RS')
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter_prijave_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await base44.entities.BlogPost.update(editingBlog.id, blogForm);
      } else {
        await base44.entities.BlogPost.create(blogForm);
      }
      refetchBlogs();
      setShowBlogForm(false);
      setEditingBlog(null);
      setBlogForm({
        naslov: '',
        kratak_opis: '',
        sadrzaj: '',
        datum: new Date().toISOString().split('T')[0],
        slika_url: '',
        status: 'objavljeno'
      });
    } catch (error) {
      console.error('Greška pri čuvanju blog posta:', error);
      alert('Došlo je do greške. Molimo pokušajte ponovo.');
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      naslov: blog.naslov,
      kratak_opis: blog.kratak_opis,
      sadrzaj: blog.sadrzaj,
      datum: blog.datum,
      slika_url: blog.slika_url,
      status: blog.status
    });
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj post?')) {
      try {
        await base44.entities.BlogPost.delete(id);
        refetchBlogs();
      } catch (error) {
        console.error('Greška pri brisanju blog posta:', error);
        alert('Došlo je do greške. Molimo pokušajte ponovo.');
      }
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin prijava</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Šifra</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#c8102e] border-gray-300 rounded focus:ring-[#c8102e]"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Zapamti me na ovom uređaju
                </label>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button type="submit" className="w-full bg-[#c8102e] hover:bg-[#a00d26]">
                Prijavi se
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    total: requests.length,
    novi: requests.filter(r => r.status === 'novi').length,
    u_obradi: requests.filter(r => r.status === 'u_obradi').length,
    zavrsen: requests.filter(r => r.status === 'zavrsen').length,
  };

  const getStatusBadge = (status) => {
    const variants = {
      novi: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Novi' },
      u_obradi: { color: 'bg-yellow-100 text-yellow-800', icon: Calendar, label: 'U obradi' },
      zavrsen: { color: 'bg-green-100 text-green-800', icon: CheckCircle2, label: 'Završen' },
    };
    const variant = variants[status] || variants.novi;
    const Icon = variant.icon;
    return (
      <Badge className={`${variant.color} flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getOptionData = () => ({
    shape: {
      'ravna': { label: 'RAVNA OBLIKA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/1_Form_Kuechenzeile_planer_dankuechen_web.jpg' },
      'l-oblika': { label: 'L-OBLIKA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/2_Form_L-Form_planer_dankuechen_web.jpg' },
      'u-oblika': { label: 'U-OBLIKA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/3_Form_U-Form_planer_dankuechen_web.jpg' },
      'otok': { label: 'KUHINJSKI OTOK', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/4_Form_Freistehende-Insel_planer_dankuechen_web.jpg' }
    },
    handleStyle: {
      'brezrocajna': { label: 'BREZROČAJNA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/1_Art_Grifflose_planer_dankuechen_web.jpg' },
      'rocajna': { label: 'ROČAJNA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/2_Art_mit_Griffen_planer_dankuechen_web.jpg' },
      'ne-vem': { label: 'NE VEM ŠE', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Weiss-ich-nicht_web.jpg' }
    },
    style: {
      'moderna': { label: 'MODERNA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/1_Stil_modern_planer_dankuechen_web.jpg' },
      'klasicna': { label: 'KLASIČNA', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/2_Stil_klassisch_planer_dankuechen_web.jpg' },
      'ne-vem': { label: 'NE VEM ŠE', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Weiss-ich-nicht_web.jpg' }
    },
    finish: {
      'visok-sijaj': { label: 'VISOK SIJAJ', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/original_05x_q_4_1.jpg' },
      'mat': { label: 'MAT', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Matt.jpg' },
      'dekor': { label: 'DEKOR', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Dekor.jpg' },
      'ne-vem': { label: 'NE VEM ŠE', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Weiss-ich-nicht_web.jpg' }
    },
    budget: {
      '4-7k': { label: 'Od 4.000 do 7.000 EUR', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Silbermond-Jasmin-Ulme-fin.jpg' },
      '7-10k': { label: 'Od 7.000 do 10.000 EUR', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Burguesa-Weiss-sevilla.RGB_color-fin_2.jpg' },
      '11k+': { label: 'Od 11.000 EUR naprej', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/All-inklusive-Silbermond-Jasmin-Alfabia-Cerros-mit-Frau_sRGB.jpg' }
    },
    delivery: {
      '2-4': { label: '2–4 MESECI', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner-01.jpg' },
      '4-6': { label: '4–6 MESECI', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner-02.jpg' },
      '6+': { label: 'KASNIJE OD 6 MESECI', image: 'https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner-03.jpg' }
    }
  });

  return (
    <div className="min-h-screen bg-zinc-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-light mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Admin Panel
            </h1>
            <p className="text-zinc-600">Dobrodošli</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Odjavi se
          </Button>
        </div>

        {/* Stats Toggle Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowStats(!showStats)}
            variant="outline"
            className="w-full md:w-auto"
          >
            {showStats ? 'Sakrij statistiku' : 'Prikaži statistiku'}
          </Button>
        </div>

        {/* Stats Cards */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ukupno zahteva</CardTitle>
                <Users className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Novi</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.novi}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">U obradi</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.u_obradi}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Završeni</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.zavrsen}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs for Requests and Newsletters */}
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="requests">Zahtevi za kuhinje</TabsTrigger>
            <TabsTrigger value="newsletters">Newsletter prijave</TabsTrigger>
            <TabsTrigger value="blog">Blog postovi</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Zahtevi za kuhinje</CardTitle>
              </CardHeader>
              <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#c8102e]" />
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                Nema zahteva za prikazivanje
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ime</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Tip kuhinje</TableHead>
                      <TableHead>Budžet</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Akcije</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.ime} {request.prezime}
                        </TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.telefon}</TableCell>
                        <TableCell className="capitalize">{request.tip_kuhinje}</TableCell>
                        <TableCell>{request.budzet}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          {new Date(request.created_date).toLocaleDateString('sr-RS')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedRequest(request)}
                              className="text-xs"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Detalji
                            </Button>
                            {request.status !== 'u_obradi' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(request.id, 'u_obradi')}
                                className="text-xs"
                              >
                                U obradi
                              </Button>
                            )}
                            {request.status !== 'zavrsen' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(request.id, 'zavrsen')}
                                className="text-xs"
                              >
                                Završi
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          </Card>
          </TabsContent>

          <TabsContent value="newsletters">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Newsletter prijave</CardTitle>
                {newsletters.length > 0 && (
                  <Button
                    onClick={handleExportNewsletters}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Izvezi CSV
                  </Button>
                )}
              </CardHeader>
              <CardContent>
            {newslettersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#c8102e]" />
              </div>
            ) : newsletters.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                Nema prijava za newsletter
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ime</TableHead>
                      <TableHead>Prezime</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Datum prijave</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsletters.map((newsletter) => (
                      <TableRow key={newsletter.id}>
                        <TableCell className="font-medium">{newsletter.ime}</TableCell>
                        <TableCell>{newsletter.prezime}</TableCell>
                        <TableCell>
                          <a href={`mailto:${newsletter.email}`} className="text-[#c8102e] hover:underline">
                            {newsletter.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge className={newsletter.status === 'aktivan' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {newsletter.status === 'aktivan' ? 'Aktivan' : 'Neaktivan'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(newsletter.created_date).toLocaleDateString('sr-RS')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Blog postovi</CardTitle>
                <Button
                  onClick={() => {
                    setShowBlogForm(true);
                    setEditingBlog(null);
                    setBlogForm({
                      naslov: '',
                      kratak_opis: '',
                      sadrzaj: '',
                      datum: new Date().toISOString().split('T')[0],
                      slika_url: '',
                      status: 'objavljeno'
                    });
                  }}
                  className="bg-[#c8102e] hover:bg-[#a00d26] gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novi post
                </Button>
              </CardHeader>
              <CardContent>
                {showBlogForm && (
                  <form onSubmit={handleBlogSubmit} className="mb-8 p-6 border rounded-lg bg-zinc-50 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">
                      {editingBlog ? 'Izmeni post' : 'Novi post'}
                    </h3>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Naslov</label>
                      <Input
                        value={blogForm.naslov}
                        onChange={(e) => setBlogForm({ ...blogForm, naslov: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Kratak opis</label>
                      <Input
                        value={blogForm.kratak_opis}
                        onChange={(e) => setBlogForm({ ...blogForm, kratak_opis: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Sadržaj</label>
                      <textarea
                        className="w-full min-h-[200px] px-3 py-2 border rounded-md"
                        value={blogForm.sadrzaj}
                        onChange={(e) => setBlogForm({ ...blogForm, sadrzaj: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Datum</label>
                        <Input
                          type="date"
                          value={blogForm.datum}
                          onChange={(e) => setBlogForm({ ...blogForm, datum: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Status</label>
                        <select
                          className="w-full h-9 px-3 border rounded-md"
                          value={blogForm.status}
                          onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                        >
                          <option value="objavljeno">Objavljeno</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">URL slike</label>
                      <Input
                        value={blogForm.slika_url}
                        onChange={(e) => setBlogForm({ ...blogForm, slika_url: e.target.value })}
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-[#c8102e] hover:bg-[#a00d26]">
                        {editingBlog ? 'Sačuvaj izmene' : 'Kreiraj post'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowBlogForm(false);
                          setEditingBlog(null);
                        }}
                      >
                        Otkaži
                      </Button>
                    </div>
                  </form>
                )}

                {blogsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#c8102e]" />
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500">
                    Nema blog postova
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Naslov</TableHead>
                          <TableHead>Datum</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Akcije</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.naslov}</TableCell>
                            <TableCell>{new Date(post.datum).toLocaleDateString('sr-RS')}</TableCell>
                            <TableCell>
                              <Badge className={post.status === 'objavljeno' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {post.status === 'objavljeno' ? 'Objavljeno' : 'Draft'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditBlog(post)}
                                  className="text-xs"
                                >
                                  <Edit2 className="w-3 h-3 mr-1" />
                                  Izmeni
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="text-xs text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Obriši
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>

          {/* Details Modal */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Detalji zahteva</DialogTitle>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-lg">
                  <div>
                    <p className="text-sm text-zinc-500">Ime i prezime</p>
                    <p className="font-semibold">{selectedRequest.ime} {selectedRequest.prezime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Email</p>
                    <p className="font-semibold">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Telefon</p>
                    <p className="font-semibold">{selectedRequest.telefon}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Status</p>
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                </div>

                {/* Kitchen Selections */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Odabir kuhinje</h3>
                  
                  {selectedRequest.tip_kuhinje && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-zinc-500 mb-2">Forma kuhinje</p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={getOptionData().shape[selectedRequest.tip_kuhinje]?.image} 
                          alt="Forma kuhinje"
                          className="w-32 h-24 object-cover rounded"
                        />
                        <p className="font-semibold">{getOptionData().shape[selectedRequest.tip_kuhinje]?.label}</p>
                      </div>
                    </div>
                  )}

                  {selectedRequest.boja_prednost && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-zinc-500 mb-2">Stil ručica</p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={getOptionData().handleStyle[selectedRequest.boja_prednost]?.image} 
                          alt="Stil ručica"
                          className="w-32 h-24 object-cover rounded"
                        />
                        <p className="font-semibold">{getOptionData().handleStyle[selectedRequest.boja_prednost]?.label}</p>
                      </div>
                    </div>
                  )}

                  {selectedRequest.stil_kuhinje && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-zinc-500 mb-2">Stil kuhinje</p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={getOptionData().style[selectedRequest.stil_kuhinje]?.image} 
                          alt="Stil kuhinje"
                          className="w-32 h-24 object-cover rounded"
                        />
                        <p className="font-semibold">{getOptionData().style[selectedRequest.stil_kuhinje]?.label}</p>
                      </div>
                    </div>
                  )}

                  {selectedRequest.budzet && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-zinc-500 mb-2">Budžet</p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={getOptionData().budget[selectedRequest.budzet]?.image} 
                          alt="Budžet"
                          className="w-32 h-24 object-cover rounded"
                        />
                        <p className="font-semibold">{getOptionData().budget[selectedRequest.budzet]?.label}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                {selectedRequest.dodatne_napomene && (
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-zinc-500 mb-2">Dodatne napomene</p>
                    <p className="text-sm">{selectedRequest.dodatne_napomene}</p>
                  </div>
                )}

                {/* Date */}
                <div className="text-sm text-zinc-500">
                  Zahtev poslat: {new Date(selectedRequest.created_date).toLocaleString('sr-RS')}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      updateStatus(selectedRequest.id, 'u_obradi');
                      setSelectedRequest(null);
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700"
                    disabled={selectedRequest.status === 'u_obradi'}
                  >
                    Označi kao U obradi
                  </Button>
                  <Button
                    onClick={() => {
                      updateStatus(selectedRequest.id, 'zavrsen');
                      setSelectedRequest(null);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={selectedRequest.status === 'zavrsen'}
                  >
                    Označi kao Završen
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}